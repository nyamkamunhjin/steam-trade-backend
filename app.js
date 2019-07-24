const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');
const SteamTotp = require('steam-totp');
const path = require('path');
const passport = require('passport');
const SteamStrategy = require('passport-steam').Strategy;
const jwt = require('jsonwebtoken');
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const SteamBot = require('./steambot/bot');
const { auth } = require('./steambot/botAuth');
const isAuth = require('./middleware/is-auth');

const app = express();

// const bot = new SteamBot({
//   accountName: auth.account_name,
//   password: auth.password,
//   twoFactorCode: SteamTotp.generateAuthCode(auth.shared_secret),
// });

app.use(bodyParser.json());

// Allow cross-origin
app.use(cors());

// middleware to authenticate user
app.use(isAuth);

app.use(
  '/graphql',
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);

passport.serializeUser((user, done) => {
  done(null, user._json);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(
  new SteamStrategy(
    {
      returnURL: 'http://localhost:3001/auth/steam/return',
      realm: 'http://localhost:3001/',
      apiKey: process.env.STEAM_API_KEY
    },
    (identifier, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY
},
function (jwtPayload, cb) {

  //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
  return UserModel.findOneById(jwtPayload.id)
      .then(user => {
          return cb(null, user);
      })
      .catch(err => {
          return cb(err);
      });
}
));

app.use(passport.initialize());

app.get(
  /^\/auth\/steam(\/return)?$/,
  passport.authenticate('steam', {
    session: false,
    failureRedirect: '/failed'
  }),
  (req, res) => {
    const token = jwt.sign({ user: req.user }, process.env.SECRET_KEY, {
      expiresIn: '2h'
    });
    res.redirect('/');
  }
);

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
      process.env.MONGO_PASSWORD
    }@cluster0-bojs0.mongodb.net/${
      process.env.MONGO_DB
    }?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
  )
  .then(() => {
    app.listen(process.env.PORT);
    console.log(`Listening on port localhost:${process.env.PORT}`);
  })
  .catch(err => {
    console.log(err);
  });
