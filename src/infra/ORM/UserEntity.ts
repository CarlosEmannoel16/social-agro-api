import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

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
  email!: string;

  @Column()
  password!: string;

  @Column()
  profileUrl!: string;

  @Column()
  updatedAt!: Date;

  @Column()
  createdAt!: Date;
}
