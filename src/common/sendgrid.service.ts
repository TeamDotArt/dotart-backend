// import sendgrid = require('@sendgrid/mail');
import * as dotenv from 'dotenv';

dotenv.config();
// sendgrid.setApiKey(process.env.API_KEY);

export const sendEmailToken = (email: string, emailToken: string) => {
  const msg = {
    to: email,
    from: 'dotart@gmail.com',
    subject: 'Confirm email',
    html: `http://localhost:5000/${emailToken}/confirm`,
  };

  // sendgrid.send(msg);
  console.log('メール送信');
  console.log(msg);
};
