import { NextFunction, Response } from 'express';
import { Container } from 'typedi';
import { UserService } from '@services/users.service';
import { RequestWithUser } from '@/interfaces/auth.interface';

export class UserController {
  public user = Container.get(UserService);

  public me = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.status(200).json({ data: req.user, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };
}
