/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {NextFunction, Request, Response} from 'express';

export function NotFoundExceptionHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  return res.status(404).send('Not Found');
}

function getErrorCode(err: any) {
  if (err.code && err.code >= 100 && err.code <= 599) {
    return err.code;
  }
  if (err.status) {
    return err.status;
  }
  return 500;
}

export function GenericExceptionHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err);
  const errCode = getErrorCode(err);
  return res.status(errCode).send('Internal Server Error');
}
