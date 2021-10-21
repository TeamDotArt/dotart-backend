// import sendgrid = require('@sendgrid/mail');
import * as dotenv from 'dotenv';

dotenv.config();
// sendgrid.setApiKey(process.env.API_KEY);

export const sendEmailToken = (email: string, emailToken: string) => {
  const msg = {
    to: email,
    from: 'dotart@gmail.com',
    subject: '認証メールです。',
    html: `
    DotArtの認証メールです。
    以下のアクティベーションリンクにアクセスしメールアドレスの認証をおこなってください！
    http://localhost:5000/${emailToken}/confirm
    `,
  };

  // TODO: メアド認証を実装する
  // sendgrid.send(msg);
  console.log('メール送信');
  console.log(msg);
};

export const sendPasswordResetEmailToken = (
  email: string,
  passwordToken: string,
) => {
  const msg = {
    to: email,
    from: 'dotart@gmail.com',
    subject: 'パスワードリセットメールです。',
    html: `
    DotArtのパスワードリセットメールです。
    以下のアクティベーションリンクにアクセスしパスワードの再登録をおこなってください！
    http://localhost:5000/${passwordToken}/passwordReset
    `,
  };

  // TODO: メアド認証を実装する
  // sendgrid.send(msg);
  console.log('メール送信');
  console.log(msg);
};
