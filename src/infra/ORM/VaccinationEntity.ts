import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AnimalEntity } from "./AnimalEntity";

@Entity({ name: "vaccination" })
export class VaccinationEntity {
  @Column()
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  date!: Date;

  @Column()
  animalId!: string;

  @Column()
  createdAt!: Date;

  @Column()
  updatedAt!: Date;

  @ManyToOne(() => AnimalEntity, (animal) => animal.vaccination)
  @JoinColumn({ name: "animalId" })
  animal!: AnimalEntity;
}
