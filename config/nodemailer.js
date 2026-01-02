import nodemailer from 'nodemailer';
import { EMAIL_PASSWORD, EMAIL_USE } from './env.js';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_USE,
        pass: EMAIL_PASSWORD
    }
})

export const accountEmail = EMAIL_USE;

export default transporter;