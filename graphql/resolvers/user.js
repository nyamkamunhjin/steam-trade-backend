const User = require('../../models/user');
const steam = require('../../helpers/steamInfo');
module.exports = {
  // users: async () => {
  //   try {
  //     const users = await User.find();
  //     return users.map(users => {
  //       return {
  //         ...users._doc
  //       }
  //     });
  //   } catch (err) {
  //     console.log(err);
  //     throw err;
  //   }
  // },
  // steamUserInfo: async (args, req) => {
  //   let steamUser;
  //   await steam.getUserSummary(args.SteamID).then(summary => {
  //     steamUser = summary;
  //   })
  //   return steamUser;
  // }
  loggedUser: async (args, req) => {
    if(!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    
    try {
      console.log('steam', req.user);
      const loggedUser = req.user;
      if(loggedUser) {
        return loggedUser;
      } else {
        throw Error('No user logged in.');
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}