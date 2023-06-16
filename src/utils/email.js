const nodemailer = require('nodemailer');
const htmlToText = require('html-to-text');

class Email {
    constructor(user, url) {
        this.to = user.email;
        this.firstName = user.name.split(' ')[0];
        this.url = url;
        this.from = `Cửa hàng điện tử <${process.env.EMAIL_FROM}>`;
    }

    newTransport() {
        if (process.env.NODE_ENV === 'production') {
            // SENGRID
            return 1;
        }
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
        const html = `<p>Forgot your password? <a href='${this.url}'>Click here</a></p>`;

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

    async sendWelcome() {
        await this.send('welcome', 'Welcome to the Phonestore!');
    }

    async sendResetPassword() {
        await this.send(
            'resetPassword',
            'Reset your password! Valid in 15 minutes'
        );
    }
}

module.exports = Email;
