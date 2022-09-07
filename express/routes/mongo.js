// @ts-check

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri =
  'mongodb+srv://klaus:ppbnmo090@@cluster0.rjygz5y.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function main() {
  const db = await client.connect();
  console.log(db);
  await client.close();
}
main();
