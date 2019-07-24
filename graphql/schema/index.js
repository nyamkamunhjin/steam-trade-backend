const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type User {
        _id: ID!
        steam_id: String!
        username: String!
        balance: Float!
    }
    type Avatar  {
        small: String!
        medium: String!
        large: String!
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
    
    input UserInput {
        steam_id: String!
        username: String!
        avatar: String!
        country: String!
        balance: Float!
    }

    type RootQuery {
        users: [User!]!
        steamUserInfo(SteamID: String!): SteamUser! 
        loggedUser: SteamUser
    }

    type RootMutation {
        createUser(userInput: UserInput): User
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    } 

`);
