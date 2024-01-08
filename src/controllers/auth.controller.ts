import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { User } from '@interfaces/users.interface';
import { AuthService } from '@services/auth.service';
import { Client } from '@/interfaces/clients.interface';
import { PhotoService } from '@/services/photos.service';
import { Photo } from '@/interfaces/photos.interface';

export class AuthController {
  public authService = Container.get(AuthService);
  public photoService = Container.get(PhotoService);

  public register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { photos, ...userData } = req.body;
      const user: User = await this.authService.register(userData);
      const images: Photo[] = await this.photoService.createPhoto(
        photos.map((photo: string) => ({ userId: user.id, url: photo })),
      );

      res.status(201).json({ data: { ...user, photos: images }, message: 'register' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: Client = req.body;
      console.log(userData);

      const { cookie, findUser, accessToken } = await this.authService.login(userData);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: findUser, accessToken, message: 'login' });
    } catch (error) {
      next(error);
    }
  };
}
