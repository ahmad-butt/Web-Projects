db.messages.remove({});
db.rooms.remove({});

const tempMessages = [
    {
        name: "Ahmad Butt",
        message: "Hello World",
        timestamp: new Date().toLocaleTimeString(),
        received: true
    },
    {
        name: "Babar Azam",
        message: "Hello Ahmad Butt",
        timestamp: new Date().toLocaleTimeString(),
        received: false
    },
]

const tempRooms = [
    {
        id: 'tempID1',
        name: 'React Hub',
        lastMessage: 'Last message of React Hub room'
    },
    {
        id: 'tempID2',
        name: 'Web Developers',
        lastMessage: 'Last message of Web Developers room'
    },
    {
        id: 'tempID3',
        name: 'Bad Boys',
        lastMessage: 'Hahahahah Nice....'
    }
]

db.messages.insertMany(tempMessages);
db.rooms.insertMany(tempRooms);
const count = db.messages.count();
const count1 = db.rooms.count();
print('Inserted', count, 'messages');
print('Inserted', count1, 'rooms');

db.messages.createIndex({name: 1});
db.messages.createIndex({message: 1});
db.messages.createIndex({timestamp: 1});
db.rooms.createIndex({name: 1});