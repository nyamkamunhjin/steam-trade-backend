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
    getUserItems: async (parent, args, context) => {
      // change later cuz wrong
      if(!context.userData) {
        throw Error('Unathenticated.');
      }

      try {
        const items = await steamBot.getUserItems(args.steam_id, 730);

        return items.map(item => {
          return {
            appid: item.appid,
            id: item.id,
            icon_url: item.icon_url,
            tradable: item.tradable,
            type: item.type,
            market_name: item.market_name,
            market_hash_name: item.market_hash_name,
            market_tradable_restriction: item.market_tradable_restriction,
            marketable: item.marketable,
            market_marketable_restriction: item.market_marketable_restriction,
            price: +11.1
          }
        })
        
      } catch (err) {
        console.log(err);
        throw err;
      }
      
      
    }
  },
  // Mutation: {
    
  // }
};