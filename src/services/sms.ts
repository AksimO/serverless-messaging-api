import * as SNS from 'aws-sdk/clients/sns';
import { createSnsEventHandler } from './sns';
import { Sms } from '../api/helpers/types';

const getSns = () => new SNS();

const sendSms = ({ recipient, text }: Sms) =>
  getSns()
    .publish(createSmsRequest(recipient, text))
    .promise();

export const sendSmsHandler = createSnsEventHandler<Sms>(sendSms);

const createSmsRequest = (phoneNumber: string, message: string) => ({
  Message: message,
  MessageStructure: 'string',
  PhoneNumber: phoneNumber
});
