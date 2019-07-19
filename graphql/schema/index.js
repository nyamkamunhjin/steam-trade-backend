const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type User {
        _id: ID!
        steam_id: String!
        username: String!
        avatar: String!
        country: String!
        balance: Float!
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
    }

    type RootMutation {
        createUser(userInput: UserInput): User
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    } 

`);
