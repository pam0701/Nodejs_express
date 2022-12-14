// @ts-check

const express = require('express');

const router = express.Router();

module.exports = router;

const WORD = [
  {
    title: 'DevOps',
    content: 'Team Leader',
  },
  {
    title: 'Backend-engineer',
    content: 'member',
  },
];

router.get('/', (req, res) => {
  const wordLen = WORD.length;
  res.render('post', { WORD, wordCounts: wordLen }); //post.ejs
  /* res.send(WORD); */
});

//특정 title을 가진 글 조회
//const wordData = WORD.find(function(word, index) -> index 값도 받아올 수 있음
router.get('/:title', (req, res) => {
  const wordData = WORD.find((word) => word.title === req.params.title);
  if (wordData) {
    res.send(wordData);
  } else {
    const err = new Error('해당 제목을 가진 글이 없습니다.');
    err.statusCode = 404;
    throw err;
  }
});

//새로운 글 작성
router.post('/', (req, res) => {
  if (Object.keys(req.query).length >= 1) {
    if (req.query.title && req.query.content) {
      const newWord = {
        title: req.query.title,
        content: req.query.content,
      };
      WORD.push(newWord);
      res.redirect('/posts'); //posts.js
    } else {
      const err = new Error('Unexpected query');
      err.statusCode = 404;
      throw err;
    }
  } else if (req.body) {
    if (req.body.title && req.body.content) {
      const newWord = {
        title: req.body.title,
        content: req.body.content,
      };
      WORD.push(newWord);
      res.redirect('/posts'); //posts.js
    } else {
      const err = new Error('Unexpected query');
      err.statusCode = 404;
      throw err;
    }
  } else {
    const err = new Error('No data');
    err.statusCode = 404;
    throw err;
  }
});

//특정 title을 가진 글 수정
router.put('/:title', (req, res) => {
  if (req.query.title && req.query.content) {
    const wordData = WORD.find((word) => word.title === req.params.title);
    if (wordData) {
      const arrIndex = WORD.findIndex(
        (word) => word.title === req.params.title
      );
      const modifyWord = {
        title: req.query.title,
        content: req.query.content,
      };
      WORD[arrIndex] = modifyWord;
      res.send('글 수정 완료');
    } else {
      const err = new Error('해당 제목을 가진 글이 없습니다.');
      err.statusCode = 404;
      throw err;
      res.end('해당 제목을 가진 글이 없습니다.');
    }
  } else {
    res.end('부적절한 쿼리입니다.');
  }
});

//특정 title을 가진 글 삭제
router.delete('/:title', (req, res) => {
  const arrIndex = WORD.findIndex((word) => word.title === req.params.title);
  if (arrIndex !== -1) {
    WORD.splice(arrIndex, 1);
    res.send('글 삭제 완료');
  } else {
    const err = new Error('해당 제목을 가진 글이 없습니다.');
    err.statusCode = 404;
    throw err;
  }
});
