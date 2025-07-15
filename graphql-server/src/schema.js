const { gql } = require('apollo-server');
const typeDefs = gql`
  type Query {
    coders: [Coder]
    activities: [Activity]
  }

  type Coder {
    id: ID!
    name: String!
    description: String
    activities: [Activity]
    activityIds: [ID]
  }

  type Activity {
    id: ID!
    name: String!
    description: String
  }
  type Mutation {
    addCoder(name: String!, description: String!): AddCoderResponse!
    addActivity(coderId: ID!, activityId: ID!): AddActivityResponse!
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
  type AddActivityResponse {
    "Similar to HTTP status code, represents the status of the mutation"
    code: Int!
    "Indicates whether the mutation was successful"
    success: Boolean!
    "Human-readable message for the UI"
    message: String!
    "The activity that was added"
    activity: Activity
  }
`;
module.exports = typeDefs;
