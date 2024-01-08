import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';
import { ClientEntity } from '@/entities/clients.entity';

const getAuthorization = (req) => {
  const cookie = req.cookies['Authorization'];
  if (cookie) return cookie;

  const header = req.header('Authorization');
  if (header) return header.split('Bearer ')[1];

  return null;
};

export const AuthMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization = getAuthorization(req);
    console.log(Authorization);

    if (Authorization) {
      const { id } = (await verify(Authorization, SECRET_KEY)) as DataStoredInToken;
      const findUser = await ClientEntity.findOne(id, { relations: ['photos'] });

      if (findUser) {
        req.user = findUser;
        next();
      } else {
        return next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      return next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    return next(new HttpException(401, 'Wrong authentication token'));
  }
};
