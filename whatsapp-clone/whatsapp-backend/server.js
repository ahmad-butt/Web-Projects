//importing
import { ApolloServer } from "apollo-server-express";
import express from "express";
import fs from "fs";
import { makeExecutableSchema } from "@graphql-tools/schema";
import cors from "cors";
import mongoose from "mongoose";
import Pusher from 'pusher';

//app config
const app = express();
app.use(cors());
const DBPassword = "PVXYWfe0HbLZSQCj";
const DBURL = `mongodb+srv://admin:${DBPassword}@cluster0.yps5u.mongodb.net/whatsappDB?retryWrites=true&w=majority`;
const pusher = new Pusher({
  appId: "1250240",
  key: "2c49e7195e6048351c01",
  secret: "c137345a973c759e536e",
  cluster: "eu",
  useTLS: true
});

//DB config

mongoose.connect(DBURL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{
  console.log('Connected to Database');
}).catch((err)=>{
  console.log(err);
});

const db = mongoose.connection;

db.once('open', ()=>{
  const roomsCollection = db.collection('rooms');
  const changeStream = roomsCollection.watch();

  changeStream.on('change', (change)=>{
    if(change.operationType==='update'){
      if(change.updateDescription.updatedFields.messages!==undefined){
        const messageDetail = change.updateDescription.updatedFields.messages[change.updateDescription.updatedFields.messages.length-1];
        pusher.trigger('MESSAGES', 'updated', {
          name: messageDetail?.name,
          message: messageDetail?.message,
          timestamp: messageDetail?.timestamp,
          received: messageDetail?.received,
        });
      }
    }else if (change.operationType==='insert') {
      console.log(change.fullDocument);
      const newRoom = change.fullDocument;
      pusher.trigger('NEW_ROOM','inserted',{
        id: newRoom?._id,
        name: newRoom?.name,
        lastMessage: newRoom?.lastMessage,
      });
    } else {
      console.log('ERROR: Triggering Pusher Failed');
    }
  })
})

//GraphQL
const newMessage = async (_, { newMessage, roomID }) => {
  const result = await db.collection("rooms").find({ id: roomID.id }).toArray();
  const tempArr = result[0].messages;
  tempArr.push(newMessage);
  await db
    .collection("rooms")
    .updateOne({ id: roomID.id }, { $set: { messages: tempArr } });
  return newMessage;
};

const newRoom = async (_, { newRoom }) => {
  const result = await db.collection("rooms").insertOne(newRoom);
  await db
    .collection("rooms")
    .updateOne(
      { _id: result.insertedId },
      { $set: { id: result.insertedId.toString() } }
    );
  db.collection("rooms").updateOne(
    { _id: result.insertedId },
    { $set: { messages: [] } }
  );
  const savedMessage = await db
    .collection("rooms")
    .findOne({ _id: result.insertedId });
  return savedMessage.message;
};

const aboutRooms = async () => {
  const mySort = { _id: -1 };
  const rooms = await db.collection("rooms").find({}).sort(mySort).toArray();
  return rooms;
};

const aboutRoom = async (_, { roomID }) => {
  const room = db.collection("rooms").findOne({ id: roomID.id });
  return room;
};

const updateLastMessage = async (_, { newMessage, roomID }) => {
  const tempMessage = newMessage.message;
  await db
    .collection("rooms")
    .updateOne({ id: roomID.id }, { $set: { lastMessage: tempMessage } });
  return newMessage;
};

const resolvers = {
  Query: {
    aboutRooms,
    aboutRoom,
  },
  Mutation: {
    newMessage,
    newRoom,
    updateLastMessage,
  },
};

const schema = makeExecutableSchema({
  typeDefs: fs.readFileSync("schema.graphql", "utf-8"),
  resolvers,
});

const server = new ApolloServer({
  schema,
});

server.applyMiddleware({ app, path: "/graphql" });

//listening
const PORT = process.env.PORT || 2000;
(async function () {
  try {
    app.listen(PORT, () => {
      console.log(`App started at http://localhost:${PORT}/graphql`);
    });
  } catch (err) {
    console.log(err);
  }
})();
