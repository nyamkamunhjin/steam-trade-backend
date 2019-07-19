const User = require('../../models/user');

module.exports = {
  users: async () => {
    try {
      const users = await User.find();
      return users.map(users => {
        return {
          ...users._doc
        }
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  createUser: async (args, req) => {
    const existingUser = await User.findOne({ email: args.userInput.steam_id });
      if (existingUser) {
        throw new Error('User exists already.');
      }

    const user = new User({
      steam_id: args.userInput.steam_id,
      username: args.userInput.username,
      avatar: args.userInput.avatar,
      country: args.userInput.country,
      balance: +args.userInput.balance
    });

    try {
      const result = await user.save();
      console.log(user);
      return {
        ...user._doc
      }
    } catch(err) {
      console.log(err);
      throw err;
    }
  }
}