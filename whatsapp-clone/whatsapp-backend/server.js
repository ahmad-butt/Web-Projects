//importing
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
// const mongoose = require('mongoose');
const fs = require('fs');
const { MongoClient } = require('mongodb');
require('dotenv').config();

//app config
const app = express();

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
    const savedMessage = await db.collection('rooms').findOne({id: roomID.id});
    return savedMessage;
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

const resolvers = {
    Query : {
        aboutRooms,
        aboutRoom,
    },
    Mutation : {
        newMessage,
        newRoom
    }
}

const server = new ApolloServer({
    typeDefs : fs.readFileSync('schema.graphql','utf-8'),
    resolvers,
});

server.applyMiddleware({app, path:'/graphql'});

//listening
const PORT = process.env.PORT || 2000;
(async function () {
    try{
        await connectToDB();
        app.listen(PORT, ()=>{
            console.log(`App started on port ${PORT}`);
        })
    } catch (err) {
        console.log(err);
    }
})();