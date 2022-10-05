const { gql } = require('apollo-server');

const typeDefs = gql`
  schema {
    query: QueryType
    mutation: MutationType
  }

  #Activity-Node
  type Activity {
    #internal node id
    _id: ID
    #description of  Activity
    description: String
    #id of  Activity
    id: ID!
    #name of  Activity
    name: String!
  }

  #Coder-Node
  type Coder {
    #internal node id
    _id: ID
    #Coder activities Activity
    activities(
      _id: ID
      _ids: [ID]
      #description of Activity
      description: String
      #descriptions is list variant of description of Activity
      descriptions: [String]
      filter: _ActivityFilter
      first: Int
      #id of Activity
      id: ID
      #ids is list variant of id of Activity
      ids: [ID]
      #name of Activity
      name: String
      #names is list variant of name of Activity
      names: [String]
      offset: Int
      orderBy: [_ActivityOrdering]
    ): [Activity]
    #description of  Coder
    description: String
    #id of  Coder
    id: ID!
    #name of  Coder
    name: String!
  }

  type MutationType {
    #Adds Activities to Coder entity
    addCoderActivities(activities: [ID!]!, id: ID!): String
    #Creates a Activity entity
    createActivity(description: String, id: ID!, name: String!): String
    #Creates a Coder entity
    createCoder(description: String, id: ID!, name: String!): String
    #Creates a Query entity
    createQuery: String
    #Deletes a Activity entity
    deleteActivity(id: ID!): String
    #Deletes a Coder entity
    deleteCoder(id: ID!): String
    #Deletes Activities from Coder entity
    deleteCoderActivities(activities: [ID!]!, id: ID!): String
    #Merge a Activity entity
    mergeActivity(description: String, id: ID!, name: String!): String
    #Merge a Coder entity
    mergeCoder(description: String, id: ID!, name: String!): String
    #Updates a Activity entity
    updateActivity(description: String, id: ID!, name: String!): String
    #Updates a Coder entity
    updateCoder(description: String, id: ID!, name: String!): String
  }

  #Query-Node
  type Query {
    #internal node id
    _id: ID
    #Query coders Coder
    coders(
      _id: ID
      _ids: [ID]
      #description of Coder
      description: String
      #descriptions is list variant of description of Coder
      descriptions: [String]
      filter: _CoderFilter
      first: Int
      #id of Coder
      id: ID
      #ids is list variant of id of Coder
      ids: [ID]
      #name of Coder
      name: String
      #names is list variant of name of Coder
      names: [String]
      offset: Int
      orderBy: [_CoderOrdering]
    ): [Coder]
  }

  type QueryType {
    Activity(
      _id: ID
      _ids: [ID]
      #description of Activity
      description: String
      #descriptions is list variant of description of Activity
      descriptions: [String]
      filter: _ActivityFilter
      first: Int
      #id of Activity
      id: ID
      #ids is list variant of id of Activity
      ids: [ID]
      #name of Activity
      name: String
      #names is list variant of name of Activity
      names: [String]
      offset: Int
      orderBy: [_ActivityOrdering]
    ): [Activity]
    Coder(
      _id: ID
      _ids: [ID]
      #description of Coder
      description: String
      #descriptions is list variant of description of Coder
      descriptions: [String]
      filter: _CoderFilter
      first: Int
      #id of Coder
      id: ID
      #ids is list variant of id of Coder
      ids: [ID]
      #name of Coder
      name: String
      #names is list variant of name of Coder
      names: [String]
      offset: Int
      orderBy: [_CoderOrdering]
    ): [Coder]
    Query(_id: ID, _ids: [ID], first: Int, offset: Int): [Query]
  }

  #Ordering Enum for Activity
  enum _ActivityOrdering {
    #Ascending sort for description
    description_asc
    #Descending sort for description
    description_desc
    #Ascending sort for id
    id_asc
    #Descending sort for id
    id_desc
    #Ascending sort for name
    name_asc
    #Descending sort for name
    name_desc
  }

  #Ordering Enum for Coder
  enum _CoderOrdering {
    #Ascending sort for description
    description_asc
    #Descending sort for description
    description_desc
    #Ascending sort for id
    id_asc
    #Descending sort for id
    id_desc
    #Ascending sort for name
    name_asc
    #Descending sort for name
    name_desc
  }

  #Filter Input Type for Activity
  input _ActivityFilter {
    #AND
    AND: [_ActivityFilter!]
    #OR
    OR: [_ActivityFilter!]
    #description
    description: String
    #description_contains
    description_contains: String
    #description_ends_with
    description_ends_with: String
    #description_gt
    description_gt: String
    #description_gte
    description_gte: String
    #description_in
    description_in: [String!]
    #description_lt
    description_lt: String
    #description_lte
    description_lte: String
    #description_not
    description_not: String
    #description_not_contains
    description_not_contains: String
    #description_not_ends_with
    description_not_ends_with: String
    #description_not_in
    description_not_in: [String!]
    #description_not_starts_with
    description_not_starts_with: String
    #description_starts_with
    description_starts_with: String
    #id
    id: ID
    #id_contains
    id_contains: ID
    #id_ends_with
    id_ends_with: ID
    #id_gt
    id_gt: ID
    #id_gte
    id_gte: ID
    #id_in
    id_in: [ID!]
    #id_lt
    id_lt: ID
    #id_lte
    id_lte: ID
    #id_not
    id_not: ID
    #id_not_contains
    id_not_contains: ID
    #id_not_ends_with
    id_not_ends_with: ID
    #id_not_in
    id_not_in: [ID!]
    #id_not_starts_with
    id_not_starts_with: ID
    #id_starts_with
    id_starts_with: ID
    #name
    name: String
    #name_contains
    name_contains: String
    #name_ends_with
    name_ends_with: String
    #name_gt
    name_gt: String
    #name_gte
    name_gte: String
    #name_in
    name_in: [String!]
    #name_lt
    name_lt: String
    #name_lte
    name_lte: String
    #name_not
    name_not: String
    #name_not_contains
    name_not_contains: String
    #name_not_ends_with
    name_not_ends_with: String
    #name_not_in
    name_not_in: [String!]
    #name_not_starts_with
    name_not_starts_with: String
    #name_starts_with
    name_starts_with: String
  }

  #Filter Input Type for Coder
  input _CoderFilter {
    #AND
    AND: [_CoderFilter!]
    #OR
    OR: [_CoderFilter!]
    #activities
    activities: _ActivityFilter
    #activities_every
    activities_every: _ActivityFilter
    #activities_in
    activities_in: _ActivityFilter
    #activities_none
    activities_none: _ActivityFilter
    #activities_not
    activities_not: _ActivityFilter
    #activities_not_in
    activities_not_in: _ActivityFilter
    #activities_single
    activities_single: _ActivityFilter
    #activities_some
    activities_some: _ActivityFilter
    #description
    description: String
    #description_contains
    description_contains: String
    #description_ends_with
    description_ends_with: String
    #description_gt
    description_gt: String
    #description_gte
    description_gte: String
    #description_in
    description_in: [String!]
    #description_lt
    description_lt: String
    #description_lte
    description_lte: String
    #description_not
    description_not: String
    #description_not_contains
    description_not_contains: String
    #description_not_ends_with
    description_not_ends_with: String
    #description_not_in
    description_not_in: [String!]
    #description_not_starts_with
    description_not_starts_with: String
    #description_starts_with
    description_starts_with: String
    #id
    id: ID
    #id_contains
    id_contains: ID
    #id_ends_with
    id_ends_with: ID
    #id_gt
    id_gt: ID
    #id_gte
    id_gte: ID
    #id_in
    id_in: [ID!]
    #id_lt
    id_lt: ID
    #id_lte
    id_lte: ID
    #id_not
    id_not: ID
    #id_not_contains
    id_not_contains: ID
    #id_not_ends_with
    id_not_ends_with: ID
    #id_not_in
    id_not_in: [ID!]
    #id_not_starts_with
    id_not_starts_with: ID
    #id_starts_with
    id_starts_with: ID
    #name
    name: String
    #name_contains
    name_contains: String
    #name_ends_with
    name_ends_with: String
    #name_gt
    name_gt: String
    #name_gte
    name_gte: String
    #name_in
    name_in: [String!]
    #name_lt
    name_lt: String
    #name_lte
    name_lte: String
    #name_not
    name_not: String
    #name_not_contains
    name_not_contains: String
    #name_not_ends_with
    name_not_ends_with: String
    #name_not_in
    name_not_in: [String!]
    #name_not_starts_with
    name_not_starts_with: String
    #name_starts_with
    name_starts_with: String
  }
`;
module.exports = typeDefs;
