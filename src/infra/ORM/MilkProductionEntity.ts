import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AnimalEntity } from "./AnimalEntity";

@Entity({ name: "milk_production" })
export class MilkProductionEntity {
  @Column()
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  quantity!: number;

  @Column()
  animalId!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => AnimalEntity, (animal) => animal.weightHistory)
  animal!: AnimalEntity;
}
