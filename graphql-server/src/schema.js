const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    coders: [Coder]
    activities: [Activity]
  }

  """
  A coder is a person who codes
  """
  type Coder {
    id: ID!
    name: String!
    description: String
    activities: [ID]
  }

  """
  An activity is something a coder does
  """
  type Activity {
    id: ID!
    name: String!
    description: String
  }
`;

module.exports = typeDefs;
