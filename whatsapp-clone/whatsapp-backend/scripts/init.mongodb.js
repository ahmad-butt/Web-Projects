db.rooms.remove({});

const tempRooms = [
    {
        id: 'tempID1',
        name: 'React Hub',
        messages: [
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
        ],
        lastMessage: 'Last message of React Hub room'
    },
    {
        id: 'tempID2',
        name: 'Web Developers',
        messages: [],
        lastMessage: 'Last message of Web Developers room'
    },
    {
        id: 'tempID3',
        name: 'Bad Boys',
        messages: [],
        lastMessage: 'Hahahahah Nice....'
    }
]

db.rooms.insertMany(tempRooms);
const count = db.rooms.count();
print('Inserted', count, 'rooms');

db.rooms.createIndex({name: 1});
db.rooms.createIndex({message: 1});
db.rooms.createIndex({timestamp: 1});