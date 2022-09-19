// @ts-check
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: 'config.env' });

const { MongoClient, ServerApiVersion } = require('mongodb');

const client = new MongoClient(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
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
