import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { AnimalEntity } from "./AnimalEntity";

@Entity({ name: "milk_production" })
export class MilkProductionEntity {
  @Column()
  @PrimaryColumn()
  id!: string;

  @Column()
  quantity!: number;

  @Column()
  animalId!: string;

  @Column()
  createdAt!: Date;

  @Column()
  updatedAt!: Date;

  @ManyToOne(() => AnimalEntity, (animal) => animal.weightHistory)
  animal!: AnimalEntity;
}
