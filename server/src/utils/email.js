const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

class Email {
    constructor({ email, name }, url) {
        this.to = email;
        this.firstName = name.split(' ')[0];
        this.url = url;
        this.from = `Cửa hàng điện tử <${process.env.EMAIL_FROM}>`;
    }

    newTransport() {
        return nodemailer.createTransport({
            host: process.env.GG_EMAIL_HOST,
            port: process.env.GG_EMAIL_PORT,
            secure: false,
            auth: {
                user: process.env.GG_EMAIL_USERNAME,
                pass: process.env.GG_EMAIL_PASSWORD,
            },
        });
    }

    async send(template, subject) {
        // 1. Render HTML template
        const html = pug.renderFile(
            `${__dirname}/../views/email/${template}.pug`,
            {
                filename: this.firstName,
                url: this.url,
                subject,
            }
        );

        // 2. Define email options
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html,
            text: htmlToText.convert(html),
        };

        // 3. Create transport and send email
        await this.newTransport().sendMail(mailOptions);
    }

    async sendRegister() {
        await this.send(
            'registerEmail',
            'Customer sign up account! Valid in 15 minutes'
        );
    }

    async sendWelcome() {
        await this.send('welcome', 'Welcome to the Digital World!');
    }

    async sendResetPassword() {
        await this.send(
            'passwordReset',
            'Customer account password reset! Valid in 15 minutes'
        );
    }
}

module.exports = Email;
