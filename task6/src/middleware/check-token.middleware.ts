import { NextFunction, Request, Response } from 'express';
import { MESSAGE_TYPE } from '../enums/status-code.enum';
import * as jwt from 'jsonwebtoken';
import { TOKEN } from '../enums/token.enum';

export const checkToken = (request: Request, response: Response, next: NextFunction) => {
  const authHeader = request.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return response.status(MESSAGE_TYPE.UNAUTHORIZED).send({ success: false, message: 'No token provided' });
  }

  jwt.verify(token, TOKEN.ACCESS_TOKEN_SECRET, (err, decode) => {
    if (err) {
      return response.status(MESSAGE_TYPE.FORBIDDEN).send({ success: false, message: 'Failed to authenticated token' });
    }

    return next();
  });

}
