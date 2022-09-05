// @ts-check

const express = require('express');
const { read } = require('fs');
// const fs = require('fs');

const app = express();

const PORT = 4000;

const userRouter = express.Router();
const postsRouter = express.Router();

const USER = [
  {
    id: 'klaus',
    name: 'van',
    email: 'psb04027@naver.com',
  },
  {
    id: 'test',
    name: 'testman',
    email: 'zxc123@daum.net',
  },
];
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use('/users', userRouter);
app.use('/posts', postsRouter);

userRouter.get('/', (req, res) => {
  const userLen = USER.length;
  res.render('index', { USER, userCounts: userLen });
  /* res.send(USER); */
});

//회원 조회
//const userData = USER.find(function(user, index) -> index 값도 받아올 수 있음
userRouter.get('/:id', (req, res) => {
  const userData = USER.find((user) => user.id === req.params.id);
  if (userData) {
    res.send(userData);
  } else {
    res.end('ID not found');
  }
});

//회원 등록
userRouter.post('/', (req, res) => {
  if (req.query.id && req.query.name && req.query.email) {
    const newUser = {
      id: req.query.id,
      name: req.query.name,
      email: req.query.email,
    };
    USER.push(newUser);
    res.send('회원 등록 완료');
  } else {
    res.end('잘못된 쿼리입니다.');
  }
});

//회원 수정
userRouter.put('/:id', (req, res) => {
  if (req.query.id && req.query.name && req.query.email) {
    const userData = USER.find((user) => user.id === req.params.id);
    if (userData) {
      const arrIndex = USER.findIndex((user) => user.id === req.params.id);
      const modifyUser = {
        id: req.query.id,
        name: req.query.name,
        email: req.query.email,
      };
      USER[arrIndex] = modifyUser;
      res.send('회원 수정 완료');
    } else {
      res.end('해당 ID를 가진 회원이 없습니다.');
    }
  } else {
    res.end('부적절한 쿼리입니다.');
  }
});

//회원 삭제
userRouter.delete('/:id', (req, res) => {
  const arrIndex = USER.findIndex((user) => user.id === req.params.id);
  if (arrIndex !== -1) {
    USER.splice(arrIndex, 1);
    res.send('회원 삭제 완료');
  } else {
    res.end('해당 ID를 가진 회원이 없습니다.');
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
