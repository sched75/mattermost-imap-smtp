class ErrorHandler {
  static handleError(error, mattermostClient, channel) {
    console.error('Error:', error);
    mattermostClient.postMessage(channel, `⚠️ Error: ${error.message}`);
  }
}

module.exports = ErrorHandler;
