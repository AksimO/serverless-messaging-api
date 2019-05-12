import { DocumentClient, ScanOutput } from 'aws-sdk/clients/dynamodb';
import { Email, Sms } from '../api/helpers/types';
import { createSnsEventHandler } from './sns';

const MESSAGES_DYNAMODB_TABLE = process.env.MESSAGES_DYNAMODB_TABLE as string;

const getDynamo = () => new DocumentClient();

const saveMessage = (
  message: Email | Sms,
  MessageId: string,
  Timestamp: string
) =>
  getDynamo()
    .put({
      TableName: MESSAGES_DYNAMODB_TABLE,
      Item: requestToScanInput(message, MessageId, Timestamp)
    })
    .promise();

export const getMessagesByRecipient = recipient =>
  getDynamo()
    .scan({
      TableName: MESSAGES_DYNAMODB_TABLE,
      ExpressionAttributeValues: { ':recipient': recipient },
      FilterExpression: 'Recipient = :recipient',
      Limit: 100
    })
    .promise()
    .then(data => (console.info(data), data))
    .then(adaptDynamoResponse);

export const saveMessagesHandler = createSnsEventHandler<Email>(saveMessage);

const requestToScanInput = ({ recipient, ...attrs }, MessageId, Timestamp) => ({
  ...attrs,
  Recipient: recipient,
  MessageId,
  Timestamp
});

const adaptDynamoResponse = ({ Items }: ScanOutput) =>
  Items
    ? Items.map(({ Timestamp, Recipient, MessageId, ...attrs }) => ({
        ...attrs,
        recipient: Recipient,
        id: MessageId
      }))
    : [];
