const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');
const config = require('../config.js');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.from = config.EMAIL_FROM;
    this.url = url;
  }

  // Create transport
  newTransport() {
    // if (process.env.NODE_ENV == 'production') {
    //   return nodemailer.createTransport({
    //     service: 'SendGrid',
    //     auth: {
    //       user: process.env.SENDGRID_USERNAME,
    //       pass: process.env.SENDGRID_PASSWORD,
    //     },
    //   });
    // }
    return nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });
  }

  // Send email
  async send(template, subject) {
    // Render HTML
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      lastName: this.lastName,
      url: this.url,
      subject,
    });

    // Define mail options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.convert(html),
    };

    // Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendPasswordReset() {
    await this.send('passwordReset', 'Your password reset token');
  }
};
