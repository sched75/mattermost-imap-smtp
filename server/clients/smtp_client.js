const nodemailer = require('nodemailer');
const { SmtpClientInterface } = require('./interfaces');

class SmtpClient extends SmtpClientInterface {
  constructor(config) {
    super();
    this.transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: true,
      auth: {
        user: config.user,
        pass: config.password,
      },
    });
  }

  sendEmail(to, subject, text) {
    return this.transporter.sendMail({
      from: this.transporter.options.auth.user,
      to,
      subject,
      text,
    });
  }
}

module.exports = SmtpClient;
