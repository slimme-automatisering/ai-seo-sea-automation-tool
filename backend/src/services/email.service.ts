import nodemailer from 'nodemailer';
import { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, FRONTEND_URL } from '../config/constants';

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      secure: EMAIL_PORT === 465,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });
  }

  async sendVerificationEmail(email: string, token: string) {
    const verificationUrl = `${FRONTEND_URL}/verify-email?token=${token}`;

    const mailOptions = {
      from: EMAIL_USER,
      to: email,
      subject: 'Verifieer je email adres',
      html: `
        <h1>Email Verificatie</h1>
        <p>Bedankt voor je registratie! Klik op onderstaande link om je email adres te verifiëren:</p>
        <a href="${verificationUrl}">Verifieer email adres</a>
        <p>Deze link is 24 uur geldig.</p>
        <p>Als je deze email niet verwacht had, kun je deze negeren.</p>
      `
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Email verzenden mislukt:', error);
      throw new Error('Email verzenden mislukt');
    }
  }

  async sendPasswordResetEmail(email: string, token: string) {
    const resetUrl = `${FRONTEND_URL}/reset-password?token=${token}`;

    const mailOptions = {
      from: EMAIL_USER,
      to: email,
      subject: 'Wachtwoord reset aanvraag',
      html: `
        <h1>Wachtwoord Reset</h1>
        <p>Je hebt een wachtwoord reset aangevraagd. Klik op onderstaande link om je wachtwoord te resetten:</p>
        <a href="${resetUrl}">Reset wachtwoord</a>
        <p>Deze link is 1 uur geldig.</p>
        <p>Als je geen wachtwoord reset hebt aangevraagd, kun je deze email negeren.</p>
      `
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Email verzenden mislukt:', error);
      throw new Error('Email verzenden mislukt');
    }
  }

  async send2FABackupCodes(email: string, backupCodes: string[]) {
    const mailOptions = {
      from: EMAIL_USER,
      to: email,
      subject: '2FA Backup Codes',
      html: `
        <h1>2FA Backup Codes</h1>
        <p>Hier zijn je backup codes voor twee-factor authenticatie. Bewaar deze codes op een veilige plek:</p>
        <pre>${backupCodes.join('\n')}</pre>
        <p>Deze codes kun je gebruiken als je geen toegang hebt tot je authenticator app.</p>
        <p>Elke code kan slechts één keer gebruikt worden.</p>
      `
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Email verzenden mislukt:', error);
      throw new Error('Email verzenden mislukt');
    }
  }
}
