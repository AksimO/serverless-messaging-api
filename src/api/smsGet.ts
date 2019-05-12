import { responseOk, responseError } from './helpers/responseAdapters';
import { getMessagesByRecipient } from '../services/store';

export const getSmsHandler = ({ pathParameters }) =>
  getMessagesByRecipient(decodeURIComponent(pathParameters.recipient))
    .then(data => responseOk(data))
    .catch(e => responseError(e.message));
