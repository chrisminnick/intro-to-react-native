const { ApolloServer } = require('apollo-server');

const CoderAPI = require('./datasources/coder-api');
const ActivityAPI = require('./datasources/activity-api');

const resolvers = require('./resolvers');
const typeDefs = require('./schema');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return { coderAPI: new CoderAPI(), activityAPI: new ActivityAPI() };
  },
});

server.listen().then(() => {
  console.log('Server is running at http://localhost:4000');
});
