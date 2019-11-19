import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  BeforeInsert, TableInheritance, ChildEntity, OneToMany,
} from 'typeorm';
import { IsEmail, IsEnum, IsNotEmpty, Length } from 'class-validator';
import * as bcrypt from 'bcryptjs';
import { UserOrganization } from './UserOrganization';

export enum UserRole {
  SUPER_ADMIN = 'ROLE_SUPER_ADMIN',
  ADMIN = 'ROLE_ADMIN',
  USER = 'ROLE_USER',
}

@Entity('users')
@Unique(['username'])
@Unique(['email'])
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Length(4, 20)
  username: string;

  @Column()
  @IsEmail()
  email: string;

  @Column({ select: false })
  @Length(4, 100)
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;

  @Column()
  @IsNotEmpty()
  firstName: string;

  @Column()
  @IsNotEmpty()
  lastName: string;

  @Column({ default: false })
  activated: boolean;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => UserOrganization, userOrganization => userOrganization.user)
  userOrganizations: UserOrganization[];

  @BeforeInsert()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  isAdmin() {
    return this.role === UserRole.ADMIN || this.role === UserRole.SUPER_ADMIN;
  }
}
