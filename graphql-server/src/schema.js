const { gql } = require('apollo-server');
const typeDefs = gql`
  type Query {
    coders: [Coder]
  }

  type Coder {
    id: ID!
    name: String!
    description: String
    activities: [ID]
  }

  type Activity {
    id: ID!
    name: String!
    description: String
  }
  type Mutation {
    addCoder(name: String!, description: String!): AddCoderResponse!
  }
  type AddCoderResponse {
    "Similar to HTTP status code, represents the status of the mutation"
    code: Int!
    "Indicates whether the mutation was successful"
    success: Boolean!
    "Human-readable message for the UI"
    message: String!
    "New coder after a successful mutation"
    coder: Coder
  }
`;
module.exports = typeDefs;
