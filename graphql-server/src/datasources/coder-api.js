const { RESTDataSource } = require('apollo-datasource-rest');

class CoderAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.CODER_API_URL;
  }
  getAllCoders() {
    return this.get('coders');
  }
  getActivities() {
    return this.get('activities');
  }
  addCoder(name, description) {
    return this.post(`coders`, { name, description, activities: [] });
  }
  async addActivity(coderId, activityId) {
    // First get the current coder
    const coder = await this.get(`coders/${coderId}`);

    // Initialize activities array if it doesn't exist
    if (!coder.activities) {
      coder.activities = [];
    }

    // Add the activity ID to the coder's activities array if it's not already there
    if (!coder.activities.includes(parseInt(activityId))) {
      coder.activities.push(parseInt(activityId));
    }

    // Update the coder with the new activities array
    await this.patch(`coders/${coderId}`, { activities: coder.activities });

    // Get and return the activity that was added
    return this.get(`activities/${activityId}`);
  }
}
module.exports = CoderAPI;
