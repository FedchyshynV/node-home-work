import { NextFunction, Request, Response } from 'express';
import { MESSAGE_TYPE } from '../enums/status-code.enum';
import { logger } from '../logger/logger';
 
export const errorMiddleware = (request: Request, response: Response, next: NextFunction)  => {

  logger.error(`method: ${request.method}, originalUrl: ${request.originalUrl}, error: unknown route`);

  const status = MESSAGE_TYPE.INTERNAL_SERVER_ERROR;
  const message = 'Internal Server Error';
  response
    .status(status)
    .send({
      status,
      message,
    })
}
