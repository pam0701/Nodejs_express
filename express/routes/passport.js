//로그인 관련된 전략을 나타내는 passport.js

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const NaverStrategy = require('passport-naver').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const KakaoStrategy = require('passport-kakao').Strategy;

const mongoClient = require('./mongo');

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'id',
        passwordField: 'password',
      },
      async (id, password, cb) => {
        const client = await mongoClient.connect();
        const userCursor = client.db('people').collection('users');
        const result = await userCursor.findOne({ id });
        if (result !== null) {
          if (result.password === password) {
            cb(null, result);
          } else {
            cb(null, false, { message: '비밀번호가 다릅니다.' });
          }
        } else {
          cb(null, false, { message: '해당 id가 없습니다.' });
        }
      }
    )
  );
  /* ---------- Start facebook 로그인 전략 ---------- */
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FB_CLIENT,
        clientSecret: process.env.FB_CLIENT_SECRET,
        callbackURL: process.env.FB_CB_URL,
      },
      async (accessToken, refreshToken, profile, cb) => {
        const client = await mongoClient.connect();
        const userCursor = client.db('people').collection('users');
        const result = await userCursor.findOne({ id: profile.id });
        if (result !== null) {
          cb(null, result);
        } else {
          const newUser = {
            id: profile.id,
            name: profile.displayName,
            provider: profile.provider,
          };
          const dbResult = await userCursor.insertOne(newUser);
          if (dbResult.acknowledged) {
            cb(null, newUser);
          } else {
            cb(null, false, { message: '페이스북 회원 생성 에러' });
          }
        }
      }
    )
  );
  /* ---------- End facebook 로그인 전략 ---------- */

  /* ---------- Start naver 로그인 전략 ---------- */
  passport.use(
    new NaverStrategy(
      {
        clientID: process.env.NAVER_CLIENT,
        clientSecret: process.env.NAVER_CLIENT_SECRET,
        callbackURL: process.env.NAVER_CB_URL,
      },
      async (accessToken, refreshToken, profile, cb) => {
        const client = await mongoClient.connect();
        const userCursor = client.db('people').collection('users');
        const result = await userCursor.findOne({ id: profile.id });
        if (result !== null) {
          cb(null, result);
        } else {
          console.log(profile.displayName);
          const newUser = {
            id: profile.id,
            name:
              profile.displayName !== undefined
                ? profile.displayName
                : profile.emails[0]?.value,
            provider: profile.provider,
          };
          const dbResult = await userCursor.insertOne(newUser);
          if (dbResult.acknowledged) {
            cb(null, newUser);
          } else {
            cb(null, false, { message: '네이버 회원 생성 에러' });
          }
        }
      }
    )
  );
  /* ---------- End naver 로그인 전략 ---------- */

  /* ---------- Start google 로그인 전략 ---------- */
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CB_URL,
      },
      async (accessToken, refreshToken, profile, cb) => {
        console.log(profile.displayName);
        const client = await mongoClient.connect();
        const userCursor = client.db('people').collection('users');
        const result = await userCursor.findOne({ id: profile.id });
        if (result !== null) {
          cb(null, result);
        } else {
          console.log(profile.displayName);
          const newUser = {
            id: profile.id,
            name:
              profile.displayName !== undefined
                ? profile.displayName
                : profile.emails[0]?.value,
            provider: profile.provider,
          };
          const dbResult = await userCursor.insertOne(newUser);
          if (dbResult.acknowledged) {
            cb(null, newUser);
          } else {
            cb(null, false, { message: '구글 회원 생성 에러' });
          }
        }
      }
    )
  );
  /* ---------- End google 로그인 전략 ---------- */

  /* ---------- Start kakao 로그인 전략 ---------- */
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_CLIENT,
        clientSecret: process.env.KAKAO_CLIENT_SECRET,
        callbackURL: process.env.KAKAO_CB_URL,
      },
      async (accessToken, refreshToken, profile, cb) => {
        console.log(profile.displayName);
        const client = await mongoClient.connect();
        const userCursor = client.db('people').collection('users');
        const result = await userCursor.findOne({ id: profile.id });
        if (result !== null) {
          cb(null, result);
        } else {
          console.log(profile.displayName);
          const newUser = {
            id: profile.id,
            name:
              profile.displayName !== undefined
                ? profile.displayName
                : profile.emails[0]?.value,
            provider: profile.provider,
          };
          const dbResult = await userCursor.insertOne(newUser);
          if (dbResult.acknowledged) {
            cb(null, newUser);
          } else {
            cb(null, false, { message: '카카오 회원 생성 에러' });
          }
        }
      }
    )
  );
  /* ---------- End kakao 로그인 전략 ---------- */

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });

  passport.deserializeUser(async (id, cb) => {
    const client = await mongoClient.connect();
    const userCursor = client.db('people').collection('users');
    const result = await userCursor.findOne({ id });
    if (result) cb(null, result);
  });
};
