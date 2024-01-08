import { Router } from 'express';
import { AuthController } from '@controllers/auth.controller';
import { CreateClientDto } from '@dtos/clients.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import fileUploadMiddleware from '@middlewares/photoUpload.middleware';

export class AuthRoute implements Routes {
  public router = Router();
  public auth = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      '/register',
      fileUploadMiddleware({ minImages: 4 }),
      ValidationMiddleware(CreateClientDto),
      this.auth.register,
    );
    this.router.post('/login', this.auth.logIn);
  }
}
