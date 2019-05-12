import { publishSendSmsRequest } from '../services/sns';
import {
  responseError,
  responseOk,
  parseParams
} from './helpers/responseAdapters';
import { Sms } from './helpers/types';

export const handleSmsPostRequest = ({ body }) => {
  console.log('handleEmailPostRequest', body);
  const params = <Sms>parseParams(body);
  return publishSendSmsRequest(params)
    .then(() => responseOk(params))
    .catch(error => responseError(error.message));
};
