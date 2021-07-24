db.issues.remove({})

const issuesDB = [
    {
        id: 1,
        status: 'New',
        owner: 'Ahmad',
        effort: 5,
        created: new Date('2021-07-06').toISOString(),
        due: null,
        title: 'Error in console when clicking Add',
    },
    {
        id: 2,
        status: 'Assigned',
        owner: 'Babar',
        effort: 69,
        created: new Date('2021-09-26').toISOString(),
        due: new Date('2021-10-15').toISOString(),
        title: 'Missing bottom border on panel',
    },
]

db.issues.insertMany(issuesDB);
const count = db.issues.count();
print('Inserted', count, 'issues');

db.issues.createIndex({ id: 1 }, { unique: true });
db.issues.createIndex({ status: 1 });
db.issues.createIndex({ owner: 1 });
db.issues.createIndex({ created: 1 });