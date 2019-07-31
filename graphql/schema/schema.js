const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    loggedInUsers: [User]!
    login: User!
    getUserItems(steam_id: String! app_id: Int! ): [SteamItem!]!
    getUser: SteamUser!
  }

  type User {
    user: SteamUser!
    token: String!
    tokenExpiration: Int!
  }

  type SteamUser {
    steamid: String!
    communityvisibilitystate: Int!
    profilestate: Int!
    personaname: String!
    lastlogoff: Int!
    profileurl: String!
    avatar: String!
    avatarmedium: String!
    avatarfull: String!
    personastate: Int!
    realname: String!
    primaryclanid: String!
    timecreated: Int!
    personastateflags: Int!
    loccountrycode: String!
    locstatecode: String!
    loccityid: Int!
  }

  type SteamItem {
    appid: Int!   
    icon_url: String!
    tradable: Boolean!
    type: String!
    market_name: String!
    market_hash_name: String!
    market_tradable_restriction: Int!
    marketable: Boolean!
    market_marketable_restriction: Int! 
    price: Float!
  }
`;

module.exports = typeDefs;
