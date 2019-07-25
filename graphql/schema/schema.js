const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    loggedInUsers: [User]!
  }

  type Mutation {
    login: User!
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
`;

module.exports = typeDefs;