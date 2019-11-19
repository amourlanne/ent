import nodemailer from 'nodemailer';
const Email = require('email-templates');
import mailerConfig from '../config/mailer';
import { Service } from 'typedi';

@Service()
export class MailerService {

  public sendMail(mailOptions: Object, transportConf: Object = mailerConfig.transportOptions) {

    const transporter = nodemailer.createTransport(transportConf);
    const email = new Email({
      ... mailerConfig.emailTemplatesOptions,
      transport: transporter,
    });

    return email.send(mailOptions);
  }
}
