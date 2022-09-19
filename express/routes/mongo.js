// @ts-check
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: 'config.env' });

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri =
  'mongodb+srv://klaus:123@cluster0.rjygz5y.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  const collection = client.db('test').collection('devices');
  // perform actions on the collection object
  client.close();
});

module.exports = client;

// async function main() {
//   await client.connect();

//   const users = client.db('Board').collection('post');

//   await users.deleteMany({});

//   await users.insertMany([
//     {
//       title: 'test1',
//       content: 'test1',
//     },
//     {
//       title: 'test2',
//       content: 'test2',
//     },
//   ]);

//   await client.close();
// }

// main();
