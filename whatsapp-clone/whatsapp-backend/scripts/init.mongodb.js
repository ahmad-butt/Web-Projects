db.rooms.remove({});

const tempRooms = [
    {
        id: 'Welcome Page',
        name: 'Welcome Here',
        messages: [
            {
                name: "Whatsapp-Clone",
                message: "Welcome Here Everyone. This is a Whatsapp-Clone where you can create communities and can chat with users all around the globe. Create Room of any interesting topic or start chatting in already existing rooms. Enjoy😄😄.",
                timestamp: "",
                received: true
            }
        ],
        lastMessage: 'Welcome Here Everyone.'
    }
]

db.rooms.insertMany(tempRooms);
const count = db.rooms.count();
print('Inserted', count, 'rooms');

db.rooms.createIndex({name: 1});
db.rooms.createIndex({message: 1});
db.rooms.createIndex({timestamp: 1});