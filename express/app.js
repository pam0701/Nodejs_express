// @ts-check

const express = require('express');
/* const bodyParser = require('body-parser'); */
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: 'klaus',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);

const router = require('./routes');
const userRouter = require('./routes/users');
const postRouter = require('./routes/posts');
const boardRouter = require('./routes/board');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use('/', router);
app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/board', boardRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);

app.use(express.static('public'));

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(err.statusCode || 500);
  res.end(err.message);
});

app.listen(PORT, () => {
  console.log(`The express server is running at ${PORT}`);
});
