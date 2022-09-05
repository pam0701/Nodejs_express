// @ts-check

const express = require('express');
// const fs = require('fs');

const app = express();

const PORT = 4000;

const userRouter = express.Router();
const postsRouter = express.Router();

const USER = [
  {
    id: 'klaus',
    name: 'van',
  },
  {
    id: 'test',
    name: 'testman',
  },
];
app.use('/users', userRouter);
app.use('/posts', postsRouter);

userRouter.get('/', (req, res) => {
  res.send(USER);
});

//const userData = USER.find(function(user, index) -> index 값도 받아올 수 있음
userRouter.get('/:id', (req, res) => {
  const userData = USER.find((user) => user.id === req.params.id);
  if (userData) {
    res.send(userData);
  } else {
    res.end('ID not found');
  }
});

userRouter.post('/', (req, res) => {
  if (req.query.id && req.query.name) {
    const newUser = {
      id: req.query.id,
      name: req.query.name,
    };
    USER.push(newUser);
    res.send('회원 등록 완료');
  } else {
    res.end('잘못된 쿼리입니다.');
  }
});

/* postsRouter.get('/', (req, res) => {
  res.send('블로그 글 목록');
});

postsRouter.post('/:title', (req, res) => {
  res.send(`제목이 ${req.params.title}인 글이 등록되었습니다.`);
}); */

// app.get('/', (req, res) => {
//   res.send('GET request');
// });

// app.post('/', (req, res) => {
//   res.send('POST request');
// });

// app.put('/', (req, res) => {
//   res.send('PUT request');
// });

// app.delete('/', (req, res) => {
//   res.send('DELETE request');
// });

// app.get('/:email/:password/:name/:gender', (req, res) => {
//   console.log(req.params);

//   res.send(req.params);
// });

// app.get('/', (req, res) => {
//   const q = req.query;
//   if (q.email && q.password && q.name && q.gender) {
//     res.send(req.query);
//   } else {
//     res.send('unexpected query');
//   }
//   console.log(req.query);

//   res.send(req.query);
// });

// app.use('/', async (req, res, next) => {
//   console.log('미들웨어 1번');

//   req.reqTime = new Date();
//   req.fileContent = await fs.promises.readFile('package.json', 'utf-8');

//   next();
// });

// app.use((req, res, next) => {
//   console.log(req.reqTime);
//   console.log(req.fileContent);
//   next();
// });

// app.use((req, res, next) => {
//   console.log('미들웨어 3번');
//   res.send('통신 종료');
//   next();
// });

app.listen(PORT, () => {
  console.log(`The express server is running at ${PORT}`);
});
