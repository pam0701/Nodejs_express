// @ts-check

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri =
  'mongodb+srv://klaus:zxc0987@cluster0.rjygz5y.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function main() {
  await client.connect();

  const users = client.db('people').collection('users');

  await users.deleteMany({});
  await users.insertMany([
    {
      name: 'pororo',
      age: 5,
    },
    {
      name: 'loopy',
      age: 6,
    },
    {
      name: 'crong',
      age: 4,
    },
  ]);

  /* // 객체 하나 삽입
  await users.insertOne({
    name: 'pororo',
    age: 5,
    }); */

  /*   //객체 여러개 삭제
  await users.deleteMany({
    age: { $gte: 5 },
    }); */

  /*
  //객체 하나만 삭제 
   users.deleteOne({
    name: 'crong',
  }); */

  await users.updateMany(
    {
      age: { $gte: 5 },
    },
    {
      $set: {
        old: 'yes',
      },
    }
  );

  const data = await users.find({
    name: 'loopy',
  });
  /*   const data = users.find({}); //mongoDB의 POINT! -> 모든 데이터를 쓰지 않을 수도 있기때문에 const data = user.find({});으로 데이터가 찾아질 때 데이터를 불러옴
  const arr = await data.toArray(); */
  console.log(data);
  const arr = await data.toArray();
  console.log(arr);

  await client.close();
}
main();
