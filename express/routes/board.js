// @ts-check

const express = require('express');

const router = express.Router();

// title ,content 가지는 BOARD

const BOARD = [
  {
    title: 'Teemo',
    content: 'mushroom',
  },
  {
    title: 'Akali',
    content: 'killer',
  },
];
router.get('/', (req, res) => {
  const boardLen = BOARD.length;
  res.render('board', { BOARD, boardCounts: boardLen });
});
router.get('/board_modify', (req, res) => {
  res.render('board_modify', { BOARD });
});

// 특정 title을 가진 글 삭제
router.delete('/:title', (req, res) => {
  const arrIndex = BOARD.findIndex((board) => board.title === req.params.title);
  if (arrIndex !== -1) {
    BOARD.splice(arrIndex, 1);
    res.send('Success Deleted');
  } else {
    const err = new Error('포스트를 찾지 못했습니다');
    err.statusCode = 404;
    throw err;
  }
});

module.exports = router;
