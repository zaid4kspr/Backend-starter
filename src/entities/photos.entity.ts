import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Photo } from '@/interfaces/photos.interface';
import { ClientEntity } from './clients.entity';

@Entity()
export class PhotoEntity extends BaseEntity implements Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string | null;

  @Column({ nullable: false })
  url: string;

  @ManyToOne(() => ClientEntity, (user) => user.photos)
  @JoinColumn({ name: 'userId' })
  user: ClientEntity;

  @Column({ nullable: false })
  userId: number;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
