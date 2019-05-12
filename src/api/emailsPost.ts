import { publishSendEmailRequest } from '../services/sns';
import {
  parseParams,
  responseError,
  responseOk
} from './helpers/responseAdapters';
import { Email } from './helpers/types';

export const handleEmailPostRequest = ({ body }) => {
  const params = <Email>parseParams(body);
  return publishSendEmailRequest(params)
    .then(() => responseOk(params))
    .catch(error => responseError({ message: error.message }));
};
