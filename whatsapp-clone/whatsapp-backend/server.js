//importing
import {ApolloServer} from 'apollo-server-express';
import express from 'express';
import fs from 'fs';
import {MongoClient} from 'mongodb';
import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { PubSub } from 'graphql-subscriptions';

//app config
const app = express();
const httpServer = createServer(app);
const pubsub = new PubSub();

//DB config 

const dbURL = process.env.DB_URL || 'mongodb://localhost/rooms';
let db;
async function connectToDB() {
    const client = new MongoClient(dbURL, {useNewUrlParser: true});
    await client.connect();
    console.log('Connected to MongoDB at',dbURL);
    db = client.db();
}

//GraphQL
const newMessage = async (_,{newMessage, roomID}) => {
    const result = await db.collection('rooms').find({id: roomID.id}).toArray();
    const tempArr = result[0].messages;
    tempArr.push(newMessage);
    await db.collection('rooms').updateOne({id: roomID.id},{$set: {'messages': tempArr}});
    await db.collection('rooms').findOne({id: roomID.id});
    pubsub.publish('NEW_MESSAGE',{newMessage: newMessage});
    return newMessage;
}

const newRoom = async (_,{newRoom}) => {
    const result = await db.collection('rooms').insertOne(newRoom);
    await db.collection('rooms').updateOne({_id: result.insertedId},{$set: {'id':result.insertedId.toString()}});
    db.collection('rooms').updateOne({_id: result.insertedId}, {$set: {'messages': []}});
    const savedMessage = await db.collection('rooms').findOne({_id: result.insertedId});
    return savedMessage.message;
}

const aboutRooms = async ()=>{
    const mySort = {_id: -1};
    const rooms = await db.collection('rooms').find({}).sort(mySort).toArray();
    return rooms;
}

const aboutRoom = async (_,{roomID})=>{
    const room = db.collection('rooms').findOne({id: roomID.id});
    return room;
}

const updateLastMessage = async (_,{newMessage,roomID})=>{
    const tempMessage = newMessage.message;
    await db.collection('rooms').updateOne({id: roomID.id},{$set: {'lastMessage': tempMessage}});
    return newMessage;
}

const resolvers = {
    Query : {
        aboutRooms,
        aboutRoom,
    },
    Mutation : {
        newMessage,
        newRoom,
        updateLastMessage,
    },
    Subscription: {
        newMessage: {
            subscribe: ()=>pubsub.asyncIterator(['NEW_MESSAGE'])
        }
    }
}

const schema = makeExecutableSchema({
    typeDefs : fs.readFileSync('schema.graphql','utf-8'),
    resolvers,
})

const server = new ApolloServer({
    schema
});

SubscriptionServer.create({
    schema,
    execute,
    subscribe
},{
    server: httpServer,
    path: server.graphqlPath
});

server.applyMiddleware({app, path:'/graphql'});

//listening
const PORT = process.env.PORT || 2000;
(async function () {
    try{
        await connectToDB();
        app.listen(PORT, ()=>{
            console.log(`App started at http://localhost:${PORT}/graphql`);
        })
    } catch (err) {
        console.log(err);
    }
})();