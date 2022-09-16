// @ts-check

const express = require('express');

const router = express.Router();
const mongoClient = require('./mongo');

router.get('/', (req, res) => {
  res.render('login');
});

router.get('/logout', async (req, res) => {
  req.session.destroy((err) => {
    res.redirect('/');
  });
});

router.post('/', async (req, res) => {
  const client = await mongoClient.connect();
  const userCursor = client.db('people').collection('users');
  const idResult = await userCursor.findOne({
    id: req.body.id,
  });
  if (idResult !== null) {
    const result = await userCursor.findOne({
      id: req.body.id,
      password: req.body.password,
    });
    if (result !== null) {
      req.session.login = true;
      req.session.userId = req.body.id;
      res.redirect('/board');
    } else {
      res.status(404);
      res.send(
        '비밀번호가 틀렸습니다.<br><a href="/login">로그인 페이지로 이동</a>'
      );
    }
  } else {
    res.status(404);
    res.send(
      '해당 id 가 없습니다.<br><a href="/login">로그인 페이지로 이동</a>'
    );
  }
});
module.exports = router;
