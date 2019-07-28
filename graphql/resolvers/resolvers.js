const steamBot = require('../../steambot/bot');

module.exports.resolvers = {
  Query: {
    loggedInUsers: (parent, args, context) => {
      console.log(context.user);
      return {
        steam_id: '12321',
        token: 'abadaAewq1',
        tokenExpiration: 1
      }
    },
    login: (parent, args, context) => {
      if(!context.user) {
        throw Error('Empty context.');
      } 

      return {
        user: context.user.user._json,
        token: context.user.token,
        tokenExpiration: context.user.tokenExpiration
      }

    },
    getUserItems: (parent, args, context) => {
      // change later cuz wrong
      // if(!context.user) {
      //   throw Error('Empty context.');
      // }
      const data = steamBot.getBotItems(args.steam_id, 730);
      // console.log(data);
      
    }
  },
  // Mutation: {
    
  // }
};