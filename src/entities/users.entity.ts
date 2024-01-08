import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
  TableInheritance,
} from 'typeorm';
import { User } from '@interfaces/users.interface';
import { PhotoEntity } from './photos.entity';
import { Exclude } from 'class-transformer';

@Entity({})
@TableInheritance({ column: { type: 'varchar', name: 'role' } })
export class UserEntity extends BaseEntity implements User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 25, nullable: false })
  firstName: string;

  @Column({ length: 25, nullable: false })
  lastName: string;

  @Column()
  fullName: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ default: true })
  active: boolean;

  @Column({ nullable: false })
  role: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => PhotoEntity, (photo) => photo.user)
  photos: PhotoEntity[];

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  // Set fullName before inserting or updating the record
  @BeforeInsert()
  @BeforeUpdate()
  setFullName() {
    this.fullName = `${this.firstName} ${this.lastName}`;
  }
}
