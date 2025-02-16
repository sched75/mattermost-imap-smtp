const { Plugin } = require('mattermost-plugin-api');
const SyncEngine = require('./engines/sync_engine');
const ClientFactory = require('./factories/client_factory');

class ImapSmtpPlugin extends Plugin {
  onActivate() {
    this.registerSettingsChangeHandler((newSettings) => {
      const configurations = JSON.parse(newSettings.Configurations);
      const routingRules = JSON.parse(newSettings.RoutingRules || '[]');

      configurations.forEach((config) => {
        const imapConfig = {
          user: config.imap.user,
          password: config.imap.password,
          host: config.imap.host,
          port: config.imap.port,
        };

        const smtpConfig = {
          user: config.smtp.user,
          password: config.smtp.password,
          host: config.smtp.host,
          port: config.smtp.port,
        };

        const syncEngine = new SyncEngine(
          imapConfig,
          smtpConfig,
          this.mattermostClient,
          config.mattermost_channel,
          routingRules
        );
        setInterval(() => syncEngine.sync(), 60000); // Synchronisation toutes les minutes
      });
    });
  }
}

module.exports = new ImapSmtpPlugin();
