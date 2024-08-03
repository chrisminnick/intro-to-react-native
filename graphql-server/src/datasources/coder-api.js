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
    return this.post(`coders`, { name, description });
  }
}
module.exports = CoderAPI;
