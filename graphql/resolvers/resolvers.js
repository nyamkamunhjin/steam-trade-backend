const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');
module.exports.resolvers = {
  Query: {
    loggedInUsers: (parent, args, context) => {
      console.log(context.user);
      return {
        steam_id: '12321',
        token: 'abadaAewq1',
        tokenExpiration: 1
      };
    },
    login: (parent, args, context) => {
      if (!context.user) {
        throw Error('Empty context.');
      }

      return {
        user: context.user.user._json,
        token: context.user.token,
        tokenExpiration: context.user.tokenExpiration
      };
    },
    getUserItems: async (parent, args, context) => {
      if (!context.userData) {
        throw Error('Unathenticated.');
      }

      try {
        const items = await fetch(
          `https://steamcommunity.com/inventory/${args.steam_id}/${
            args.app_id
          }/2?l=english&count=5000`
        ).then(res => {
          return res.json();
        });

        return items.descriptions.map(item => {
          return {
            appid: item.appid,
            icon_url: item.icon_url,
            tradable: item.tradable,
            type: item.type,
            market_name: item.market_name,
            market_hash_name: item.market_hash_name,
            market_tradable_restriction: item.market_tradable_restriction,
            marketable: item.marketable,
            market_marketable_restriction: item.market_marketable_restriction,
            price: +11.1
          };
        });
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    getUser: async (parent, args, context) => {
      if (!context.userData) {
        throw Error('Unathenticated.');
      }
      // console.log(context.userData._json);

      try {
        return { ...context.userData._json };
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  }
  // Mutation: {

  // }
};
