import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { AnimalEntity } from "./AnimalEntity";

@Entity()
export class WeightHistoryEntity {
  @Column()
  @PrimaryColumn()
  id!: string;

  @Column()
  weight!: number;

  @Column()
  animalId!: string;

  @Column()
  createdAt!: Date;

  @Column()
  updatedAt!: Date;

  @ManyToOne(() => AnimalEntity, (animal) => animal.weightHistory)
  animal!: AnimalEntity;
}
