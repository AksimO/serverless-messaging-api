// import * as aws from 'aws-sdk';
import * as SNS from 'aws-sdk/clients/sns';
import { Sms, Email } from '../api/helpers/types';
import { parseParams } from '../api/helpers/responseAdapters';

const getSns = () => new SNS({ apiVersion: '2010-03-31' });

const SNS_TOPIC_EMAIL_ARN = process.env.SNS_TOPIC_EMAIL_ARN as string;
const SNS_TOPIC_SMS_ARN = process.env.SNS_TOPIC_SMS_ARN as string;

const messagePublisher = (topicArn: string) => (message: Sms | Email) => {
  console.log('messagePublisher', { topicArn, message });
  return getSns()
    .publish({
      TopicArn: topicArn,
      Message: JSON.stringify(message)
    })
    .promise();
};

const parseMessage = <R>({ Records: records }): R[] =>
  records.map(({ Sns }) => {
    console.log(Sns);
    return [parseParams<R>(Sns.Message), Sns.MessageId, Sns.Timestamp];
  });

export const createSnsEventHandler = <R, T = any>(
  messageHandler: (r: R, MessageId?: string, Timestamp?: string) => Promise<T>
) => event =>
  Promise.all(
    parseMessage(event).map(([message, MessageId, Timestamp]) =>
      messageHandler(message, MessageId, Timestamp)
    )
  );

export const publishSendEmailRequest = messagePublisher(SNS_TOPIC_EMAIL_ARN);

export const publishSendSmsRequest = messagePublisher(SNS_TOPIC_SMS_ARN);
