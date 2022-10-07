const { RESTDataSource } = require('apollo-datasource-rest');

class ActivityAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3001';
  }
  getAllActivities() {
    return this.get('activities');
  }
}

module.exports = ActivityAPI;
