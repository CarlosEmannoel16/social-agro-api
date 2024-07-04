import { Vaccination } from "@prisma/client";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  OneToOne,
} from "typeorm";

@Entity()
export class UserEntity {
  @Column()
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  dateOfBirth!: Date;

  @Column()
  createdAt!: Date;

  @Column()
  password!: string;

  @Column()
  profileUrl!: string;

  @Column()
  updatedAt!: Date;
}
