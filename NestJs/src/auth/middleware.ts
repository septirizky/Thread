import 'dotenv/config';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { errorHandling } from '../helper/errorHandling';

@Injectable()
export class cekToken implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization;
      if (token) {
        const verif = jwt.verify(token, process.env.SECRET_KEY);
        if (verif) {
          next();
        } else {
          res.send(errorHandling(400, 'Token Salah'));
        }
      } else {
        res.send(errorHandling(401, 'Token Tidak Ada'));
      }
    } catch (error) {
      res.send(errorHandling(400, error.message));
    }
  }
}
