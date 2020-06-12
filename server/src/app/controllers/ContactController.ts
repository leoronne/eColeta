import { Request, Response } from 'express';

const mailer = require('../../modules/mailer');
require('dotenv/config');

class ContactController {
  async send(req: Request, res: Response) {
    try {
      const { email, name, message } = req.body;

      await mailer.sendMail(
        {
          to: `${process.env.APP_MAIL}`,
          from: `"Léo, of eColeta" <no-reply@ecoleta.com>`,
          subject: `New message from ${name}`,
          template: 'auth/contact',
          context: {
            title: 'Hello team',
            text1: 'We received a new message from',
            name: `${name} (${email})`,
            text2: message,
          },
        },
        (err) => {
          if (err)
            return res.status(503).send({
              message: err.message,
            });
        }
      );

      return res.status(204).json();
    } catch (err) {
      const message = err.message;
      return res.status(500).json(message);
    }
  }
}

export default ContactController;
