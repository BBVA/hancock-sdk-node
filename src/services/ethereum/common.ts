import { HancockError, hancockErrorType, hancockGenericApiError } from './error';
import { error } from './utils';

export const checkStatus = async (response: any): Promise<any> => {
  // HTTP status code between 200 and 299
  if (!response.ok) {
    errorHandler({body: response.json()});
  }

  return response.json();
};

export const errorHandler = (err: any) => {

  const out: HancockError = err instanceof HancockError
    ? err
    : err.body
      ? error(new HancockError(hancockErrorType.Api, err.body.internalError, err.body.error, err.body.message), err)
      : error(hancockGenericApiError, err);

  throw out;
};
