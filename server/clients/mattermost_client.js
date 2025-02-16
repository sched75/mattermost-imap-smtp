const axios = require('axios');

class MattermostClient {
  constructor(baseUrl, token) {
    this.baseUrl = baseUrl;
    this.token = token;
  }

  async postMessage(channel, message) {
    const response = await axios.post(
      `${this.baseUrl}/api/v4/posts`,
      { channel_id: channel, message },
      { headers: { Authorization: `Bearer ${this.token}` } }
    );
    return response.data;
  }

  async uploadFile(channel, file) {
    const formData = new FormData();
    formData.append('files', file);
    const response = await axios.post(
      `${this.baseUrl}/api/v4/files`,
      formData,
      { headers: { Authorization: `Bearer ${this.token}`, 'Content-Type': 'multipart/form-data' } }
    );
    return response.data;
  }
}

module.exports = MattermostClient;
