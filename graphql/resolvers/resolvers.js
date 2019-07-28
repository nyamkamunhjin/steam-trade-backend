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
      // if(!context.userData) {
      //   throw Error('Unathenticated.');
      // }

      try {
        let items; 
        await steamBot.getUserItems(args.steam_id, 570).then(data => {
          items = data;
        });

        return items.map(item => {
          return {
            appid: item.appid,
            contextid: item.contextid,
            assetid: item.assetid,
            classid: item.classid,
            instanceid: item.instanceid,
            amount: item.amount,
            pos: item.pos,
            id: item.id,
            background_color: item.background_color,
            icon_url: item.icon_url,
            descriptions: item.descriptions.map(desc => {
              return {
                type: desc.type,
                value: desc.value,
                color: desc.color
              }
            }),
            tradable: item.tradable,
            name: item.name,
            name_color: item.name_color,
            type: item.type,
            market_name: item.market_name,
            market_hash_name: item.market_hash_name,
            commodity: item.commodity,
            market_tradable_restriction: item.market_tradable_restriction,
            marketable: item.marketable,
            tags: item.tags.map(tag => {
              return {
                internal_name: tag.internal_name,
                name: tag.name,
                category: tag.category,
                color: tag.color
              }
            }),
            is_currency: item.is_currency,
            market_marketable_restriction: item.market_marketable_restriction
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