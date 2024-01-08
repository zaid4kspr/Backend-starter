import { PrimaryGeneratedColumn, Column, BeforeInsert, ChildEntity } from 'typeorm';
import { UserEntity } from './users.entity';
import { Client } from '@/interfaces/clients.interface';
import { IsUrl } from 'class-validator';

@ChildEntity()
export class ClientEntity extends UserEntity implements Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @IsUrl({}, { message: 'URL must be a valid URL' })
  avatar: string;

  @BeforeInsert()
  setDefaultAvatar() {
    this.avatar =
      'https://media.licdn.com/dms/image/D4E03AQGdG71m7z7NGg/profile-displayphoto-shrink_800_800/0/1701643336903?e=1707350400&v=beta&t=b-ocVHYV-im3WNHB_-40fMoNAt3OPgpWYGSv-WLK6N8';
  }
}
