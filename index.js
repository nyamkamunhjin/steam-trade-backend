const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const dotenv = require('dotenv');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const passport = require('./steamAuth/passport');
const typeDefs = require('./graphql/schema/schema');
const { resolvers } = require('./graphql/resolvers/resolvers');

dotenv.config();
const app = express();
let user = {
  user: null,
  token: null,
  tokenExpiration: null
};

app.use(cors());
app.use(passport.initialize());



app.get(
  /^\/auth\/steam(\/return)?$/,
  passport.authenticate('steam', { session: false, failureRedirect: '/' }),
  (req, res) => {
    const tokenExpiration = 2;

    user = {
      user: req.user,
      token: jwt.sign({ user: req.user }, process.env.SECRET_KEY, {
        expiresIn: `${tokenExpiration}h`
      }),
      tokenExpiration
    } 
    res.redirect('/');
  }
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // console.log(req.user);

    return {
      user: user || null,
    };
  }
});

server.applyMiddleware({ app, path: '/graphql' });

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
    app.listen(process.env.PORT, () => {
      console.log(`Listening on port localhost:${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
  });
