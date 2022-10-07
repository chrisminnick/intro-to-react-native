const resolvers = {
  Query: {
    coders: (_, __, { dataSources }) => {
      return dataSources.coderAPI.getAllCoders();
    },
    activities: (_, __, { dataSources }) => {
      return dataSources.activityAPI.getAllActivities();
    },
  },
};

module.exports = resolvers;
