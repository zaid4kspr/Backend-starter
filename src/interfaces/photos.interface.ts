import { User } from './users.interface';

export interface Photo {
  id?: number;
  name?: string | null;
  url: string;
  user: User;
  userId: number;
  createdAt: Date;
  updatedAt?: Date;
}
