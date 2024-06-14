const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const CoderAPI = require('./datasources/coder-api');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return { coderAPI: new CoderAPI() };
  },
});

server.listen().then(() => {
  console.log('Server is running at http://localhost:4000');
});
