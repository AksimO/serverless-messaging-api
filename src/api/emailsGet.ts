import { getMessagesByRecipient } from '../services/store';
import { responseError, responseOk } from './helpers/responseAdapters';

export const getEmailsHandler = ({ pathParameters }) =>
  getMessagesByRecipient(decodeURIComponent(pathParameters.recipient))
    .then(data => responseOk(data))
    .catch(e => responseError(e.message));
