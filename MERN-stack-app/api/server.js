//Importing
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const fs = require('fs');
const { MongoClient } = require('mongodb');
const app = express();
require('dotenv').config();


//declaration
const url = process.env.DB_URL || 'mongodb://localhost/issueTracker';
let db;
const PORT = process.env.API_SERVER_PORT || 3000;

async function connectToDB(){
    const client = new MongoClient(url,{useNewUrlParser: true});
    await client.connect();
    console.log('Connected to MongoDB at',url);
    db = client.db();
}

//GraphQL APIs
async function setIssueAdd( _, {issue}) {
    issue.created = new Date().toISOString();
    issue.id = await db.collection('issues').count()+1;
    const result = await db.collection('issues').insertOne(issue);
    const savedIssue = await db.collection('issues').findOne({_id:result.insertedId})
    return savedIssue;
}

async function issueList(){
    const issues = await db.collection('issues').find({}).toArray();
    return issues;
}

const resolvers = {
    Query: {
        issueList,
    },
    Mutation: {
        setIssueAdd,
    },
};

//GraphQL Server
const server = new ApolloServer({
    typeDefs: fs.readFileSync('schema.graphql', 'utf-8'),
    resolvers,
    formatError: error=>{
        console.log(error);
        return error;
    }
});

server.applyMiddleware({app, path: '/graphql'});

//Asynchronously connecting to Database and listening app on PORT declared above
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