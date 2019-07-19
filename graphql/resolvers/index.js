const userResolver = require('./user');

const rootResolver = {
  ...userResolver
};

module.exports = rootResolver;