const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    loggedInUsers: [User]!
    login: User!
    getUserItems(steam_id: String!): [SteamItem]
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
    commentpermission: Int!
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

  type Description {
    type: String
    value: String
    color: String
  }

  type Tag {
    internal_name: String!
    name: String!
    category: String!
    color: String!
  }

  type SteamItem {
    appid: Int!
    id: String!   
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
