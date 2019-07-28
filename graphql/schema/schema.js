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
    contextid: String!
    assetid: String!
    classid: String!
    instanceid: String!
    amount: Int!
    pos: Int!
    id: String!
    background_color: String!
    icon_url: String!
    descriptions: [Description]
    tradable: Boolean!
    name: String!
    name_color: String!
    type: String!
    market_name: String!
    market_hash_name: String!
    commodity: Boolean!
    market_tradable_restriction: Int!
    marketable: Boolean!
    tags: [Tag]
    is_currency: Boolean!
    market_marketable_restriction: Int!
  }
`;

module.exports = typeDefs;
