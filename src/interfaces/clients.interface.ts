import { Photo } from './photos.interface';
import { User } from './users.interface';

export interface Client extends User {
  avatar: string;
  photos: Photo[];
}
