const Imap = require('node-imap');
const { ImapClientInterface } = require('./interfaces');

class ImapClient extends ImapClientInterface {
  constructor(config) {
    super();
    this.imap = new Imap({
      user: config.user,
      password: config.password,
      host: config.host,
      port: config.port,
      tls: true,
    });
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.imap.once('ready', () => resolve());
      this.imap.once('error', (err) => reject(err));
      this.imap.connect();
    });
  }

  fetchNewEmails() {
    return new Promise((resolve, reject) => {
      const emails = [];
      this.imap.openBox('INBOX', false, (err) => {
        if (err) return reject(err);

        const searchCriteria = ['UNSEEN'];
        const fetchOptions = { bodies: ['HEADER', 'TEXT'], markSeen: true, struct: true };

        const fetch = this.imap.search(searchCriteria, fetchOptions);
        fetch.on('message', (msg) => {
          let email = { headers: {}, text: '', attachments: [] };
          msg.on('body', (stream, info) => {
            let buffer = '';
            stream.on('data', (chunk) => (buffer += chunk.toString('utf8')));
            stream.on('end', () => {
              if (info.which === 'HEADER') email.headers = Imap.parseHeader(buffer);
              else if (info.which === 'TEXT') email.text = buffer;
            });
          });
          msg.on('attributes', (attrs) => {
            const parts = attrs.struct || [];
            parts.forEach((part) => {
              if (part.disposition && part.disposition.type === 'attachment') {
                email.attachments.push({
                  filename: part.disposition.params.filename,
                  size: part.size,
                });
              }
            });
          });
          msg.once('end', () => emails.push(email));
        });
        fetch.once('error', (err) => reject(err));
        fetch.once('end', () => resolve(emails));
      });
    });
  }

  disconnect() {
    this.imap.end();
  }
}

module.exports = ImapClient;
