const resolvers = {
  Query: {
    coders: (_, __, { dataSources }) => {
      return dataSources.coderAPI.getAllCoders();
    },
    activities: (_, __, { dataSources }) => {
      return dataSources.coderAPI.getActivities();
    },
  },
  Coder: {
    activities: async (coder, _, { dataSources }) => {
      // Resolve activity IDs to full activity objects
      if (!coder.activities || coder.activities.length === 0) {
        return [];
      }
      const activities = await dataSources.coderAPI.getActivities();
      return activities.filter((activity) =>
        coder.activities.includes(parseInt(activity.id))
      );
    },
    activityIds: (coder) => {
      // Return the original activity IDs array
      return coder.activities || [];
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

    addActivity: async (_, { coderId, activityId }, { dataSources }) => {
      try {
        const activity = await dataSources.coderAPI.addActivity(
          coderId,
          activityId
        );
        return {
          code: 200,
          success: true,
          message: `Successfully added activity ${activity.name} to coder`,
          activity,
        };
      } catch (err) {
        console.log(err);
        return {
          code: err.extensions?.response?.status || 500,
          success: false,
          message: err.extensions?.response?.body || err.message,
          activity: null,
        };
      }
    },
  },
};

module.exports = resolvers;
