const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost/issueTracker';


const testWithCallbacks = (callback)=>{
    console.log('\n--- testWithCallbacks ---');
    const client = new MongoClient(url, {useNewUrlParser: true});
    client.connect((err, client)=>{
        if(err) {
            callback(err);
            return;
        }
        const db = client.db();
    
        const collection = db.collection('employees');
    
        const employee = {id: 1, name: 'Ahmad', age: 20};
    
        collection.insertOne(employee, (err,result)=>{
            if(err) {
                client.close();
                callback(err);
                return;
            }
            console.log('Result of insert:\n',result.insertedId);
            collection.find({_id: result.insertedId}).toArray((err,docs)=>{
                if(err) {
                    client.close();
                    callback(err);
                    return;
                }
                console.log('Result of find:\n',docs);
                client.close();
                callback(err);
            });
        });
    });
}

async function testWithAsync() {
    console.log('\n--- testWithAsync ---');
    const client = new MongoClient(url, {useNewUrlParser: true});
    try{
        await client.connect();
        console.log('Connected to MongoDB');
        const db = client.db();
        const collection = db.collection('employees');
    
        const employee = {id: 2, name: 'Ali', age: 21};
        const result = await collection.insertOne(employee);
        console.log('Result of insert:\n', result.insertedId);
    
        const docs = await collection.find({_id:result.insertedId}).toArray();
        console.log('Result of find:\n', docs);
    } catch (err) {
        console.log(err);
    } finally {
        client.close()
    }
}

testWithCallbacks((err)=>{
    if(err) {
        console.log(err);
    }
    testWithAsync();
})