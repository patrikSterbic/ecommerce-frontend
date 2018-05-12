import { isString, isFunction } from 'lodash';

export function getErrorMessage(error) {
  if (error) {
    if (isString(error)) {
      return error;
    }
    if (isFunction(error.get)) {
      if (error.get('message') && error.get('status')) {
        return `${error.get('status')} - ${error.get('message')}`;
      }
      if (error.get('message')) {
        return error.get('message');
      }
      if (error.get('error')) {
        return error.get('error');
      }
      if (error.get('reason')) {
        return `${error.get('error')} - ${error.get('reason')}`;
      }

      return JSON.stringify(error);
    }

    if (error.message && error.status) {
      return `${error.status} - ${error.message}`;
    }
    if (error.message) {
      return error.message;
    }
    if (error.error) {
      return error.error;
    }
    if (error.reason) {
      return `${error.error} - ${error.reason}`;
    }

    return JSON.stringify(error);
  }
  return 'Unknown error';
}
