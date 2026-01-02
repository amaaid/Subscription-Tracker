import dayjs from "dayjs";
import { emailTemplates } from "./email-template.js";
import transporter, { accountEmail } from "../config/nodemailer.js";
import sanitizeHtml from 'sanitize-html';

export const sendReminderEmail = async ({to, type, subscription}) => {
    if(!to || !type) {
        throw new Error('Missing required parameters');
    }   

    const template = emailTemplates.find((t) => t.label === type);

    if(!template) {
        throw new Error('Invalid email type');
    }

    const mailInfo = {
        userName: subscription.user.name,
        subscriptionName: subscription.name,
        renewalDate: dayjs(subscription.renewalDate).format('MMM D, YYYY'),
        price: `${subscription.currency} ${subscription.price} (${subscription.frequency})`,
        paymentMethod: subscription.paymentMethod,
    }

    const message = template.generateBody(mailInfo);
    const subject = template.generateSubject(mailInfo);

    const sanitizedHtml = sanitizeHtml(message);

    const mailOptions = {
        from: accountEmail,
        to: to,
        subject: subject,
        html: sanitizedHtml
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    })
}