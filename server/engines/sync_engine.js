const fs = require('fs');
const ClientFactory = require('../factories/client_factory');
const ErrorHandler = require('../handlers/error_handler');
const { addToQueue } = require('../queues/sync_queue');

class SyncEngine {
  constructor(imapConfig, smtpConfig, mattermostClient, mattermostChannel, routingRules) {
    this.imapClient = ClientFactory.createImapClient(imapConfig);
    this.smtpClient = ClientFactory.createSmtpClient(smtpConfig);
    this.mattermostClient = mattermostClient;
    this.mattermostChannel = mattermostChannel;
    this.routingRules = routingRules;
  }

  async sync() {
    try {
      await this.imapClient.connect();
      const emails = await this.imapClient.fetchNewEmails();
      for (const email of emails) {
        const targetChannel = this.getTargetChannel(email);
        addToQueue(async () => {
          await this.mattermostClient.postMessage(
            targetChannel,
            `📧 New email from ${email.headers.from}: ${email.headers.subject}\n${email.text}`
          );
          if (email.attachments.length > 0) {
            for (const attachment of email.attachments) {
              if (attachment.size < 10 * 1024 * 1024) { // Limite de 10 Mo
                const file = fs.readFileSync(attachment.path);
                await this.mattermostClient.uploadFile(targetChannel, file);
              }
            }
          }
        });
      }
    } catch (err) {
      ErrorHandler.handleError(err, this.mattermostClient, this.mattermostChannel);
    } finally {
      this.imapClient.disconnect();
    }
  }

  getTargetChannel(email) {
    for (const rule of this.routingRules) {
      if (rule.condition === 'subject' && email.headers.subject.includes(rule.value)) {
        return rule.channel;
      }
      if (rule.condition === 'from' && email.headers.from.includes(rule.value)) {
        return rule.channel;
      }
    }
    return this.mattermostChannel;
  }
}

module.exports = SyncEngine;
