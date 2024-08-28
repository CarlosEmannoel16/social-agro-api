import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { AnimalEntity } from "./AnimalEntity";

@Entity({ name: "user" })
export class UserEntity {
  @Column()
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  dateOfBirth!: Date;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  profileUrl?: string;

  @Column()
  updatedAt!: Date;

  @Column()
  createdAt!: Date;

  @OneToMany(() => AnimalEntity, (animal) => animal.userId)
  animals!: AnimalEntity[];
}
