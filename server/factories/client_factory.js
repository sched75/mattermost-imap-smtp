const ImapClient = require('../clients/imap_client');
const SmtpClient = require('../clients/smtp_client');

class ClientFactory {
  static createImapClient(config) {
    return new ImapClient(config);
  }

  static createSmtpClient(config) {
    return new SmtpClient(config);
  }
}

module.exports = ClientFactory;
