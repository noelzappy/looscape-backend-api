import { User } from '@/interfaces/users.interface';
import { Service } from 'typedi';
import nodemailer from 'nodemailer';
import { CLIENT_URL, MAIL_FROM, MAIL_HOST, MAIL_PASSWORD, MAIL_PORT, MAIL_USER } from '@/config';
import { logger } from '@/utils/logger';

@Service()
export class EmailService {
  private static instance: EmailService;

  private transporter: nodemailer.Transporter;

  constructor() {
    this.createConnection();
    this.verifyConnection();
  }

  static getInstance() {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  //CREATE A CONNECTION TO THE SMTP SERVER
  async createConnection() {
    this.transporter = nodemailer.createTransport({
      host: MAIL_HOST,
      port: Number(MAIL_PORT),
      auth: {
        user: MAIL_USER,
        pass: MAIL_PASSWORD,
      },
    });
  }

  //VERIFY CONNECTION
  async verifyConnection() {
    try {
      await this.transporter.verify();

      logger.info('Email service initialized');
    } catch (error) {
      logger.error('Error initializing email service');
      logger.error(error);

      // throw error;
    }
  }

  //CREATE TRANSPORTER
  public getTransporter() {
    return this.transporter;
  }

  public sendEmail = async ({ to, subject, text, html }: { to: string; subject: string; text?: string; html?: string }) => {
    if (!text && !html) throw new Error('Either text or html must be provided');

    const mailOptions = {
      from: MAIL_FROM,
      to,
      subject,
    };

    if (text) {
      mailOptions['text'] = text;
    }

    if (html) {
      mailOptions['html'] = html;
    }

    await this.transporter.sendMail(mailOptions);
  };

  public sendWelcomeEmail = async (user: User) => {
    const subject = 'Welcome to the app';
    const text = `Welcome to the app, ${user.name}. Let me know how you get along with the app.`;

    await this.sendEmail({
      to: user.email,
      subject,
      text,
    });
  };

  public sendCancellationEmail = async (user: User) => {
    const subject = 'Sorry to see you go';
    const text = `Goodbye, ${user.name}. I hope to see you back sometime soon.`;

    await this.sendEmail({
      to: user.email,
      subject,
      text,
    });
  };

  public sendPasswordResetEmail = async (user: User, token: string) => {
    const subject = 'Password Reset';
    const text = `Hi ${user.name},\n\nYou are receiving this email because you (or someone else) has requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\n${CLIENT_URL}/reset-password/${token}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`;

    await this.sendEmail({
      to: user.email,
      subject,
      text,
    });
  };

  public sendEmailVerificationEmail = async (user: User, token: string) => {
    const subject = 'Email Verification';

    const html = `<p>Hi ${user.name},</p>
    <p>You are receiving this email because you (or someone else) has requested the verification of your email address.</p> <p>Please click on the following link, or paste this into your browser to complete the process:</p>
    <p>
    <a   href="${CLIENT_URL}/verify-email/${token}">
    <button style="background-color: #64C6C5; /* Green */ border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block;"
    >Verify Email</button>
    </a>
    </p>
    <p>If you did not request this, please ignore this email and your email address will remain unchanged.</p>`;

    await this.sendEmail({
      to: user.email,
      subject,
      html,
    });
  };

  public sendPasswordResetSuccessEmail = async (user: User) => {
    const subject = 'Password Reset Success';
    const text = `Hi ${user.name},\n\nThis is a confirmation that the password for your account ${user.email} has just been reset.\n`;

    await this.sendEmail({
      to: user.email,
      subject,
      text,
    });
  };

  public sendEmailVerificationSuccessEmail = async (user: User) => {
    const subject = 'Email Verification Success';
    const text = `Hi ${user.name},\n\nThis is a confirmation that the email for your account ${user.email} has just been verified.\n`;

    await this.sendEmail({
      to: user.email,
      subject,
      text,
    });
  };
}
