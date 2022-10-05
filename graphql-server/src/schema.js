const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    coders: [Coder]
    coder(id: ID!): Coder
    activities: [Activity]
    activity(id: ID!): Activity
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

  """
  A coder is a person who writes code and does activities.
  """
  type Coder {
    id: ID
    name: String!
    description: String
    activities: [Activity]
  }

  """
  An activity is a thing that a coder does.
  """
  type Activity {
    id: ID!
    name: String!
    description: String
  }
`;
module.exports = typeDefs;
