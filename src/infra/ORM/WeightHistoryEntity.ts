import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { AnimalEntity } from "./AnimalEntity";

@Entity({ name: "weight_history" })
export class WeightHistoryEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "float" })
  weight!: number;

  @Column()
  date!: Date;

  @Column()
  animalId!: string;

  @Column({ default: new Date() })
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => AnimalEntity, (animal) => animal.weightHistory)
  animal!: AnimalEntity;
}
