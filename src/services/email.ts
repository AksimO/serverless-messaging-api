import * as SES from 'aws-sdk/clients/ses';
import { Email } from '../api/helpers/types';
import { createSnsEventHandler } from './sns';

const getSes = () => new SES({ apiVersion: '2010-12-01' });

const REPLAY_EMAIL = process.env.REPLAY_EMAIL as string;
const charset = 'UTF-8';

const sendEmail = ({ recipient, body, subject }) =>
  getSes()
    .sendEmail(createEmailRequest(recipient, body, subject))
    .promise()
    .then(
      data => (console.log('Email sent'), data),
      e => console.error('Fuu', e)
    );

export const sendEmailHandler = createSnsEventHandler<Email>(sendEmail);

const createEmailRequest = (
  to: string,
  text: string,
  subj = 'Subject:'
): SES.SendEmailRequest => ({
  Destination: {
    ToAddresses: [to]
  },
  Message: {
    Body: {
      Text: {
        Charset: charset,
        Data: text
      }
    },
    Subject: {
      Charset: charset,
      Data: subj
    }
  },
  Source: REPLAY_EMAIL
});
