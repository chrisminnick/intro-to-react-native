const resolvers = {
  Query: {
    coders: (_, __, { dataSources }) => {
      return dataSources.coderAPI.getAllCoders();
    },
  },
  Mutation: {
    // adds a new coder to the database
    addCoder: async (_, { name, description }, { dataSources }) => {
      try {
        const coder = await dataSources.coderAPI.addCoder(name, description);
        return {
          code: 200,
          success: true,
          message: `Successfully added coder ${name}`,
          coder,
        };
      } catch (err) {
        console.log(err);
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          coder: null,
        };
      }
    },
  },
};

module.exports = resolvers;
