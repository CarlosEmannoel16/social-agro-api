import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { AnimalEntity } from "./AnimalEntity";

@Entity()
export class DailyAmountOfMilkEntity {
  @Column()
  @PrimaryColumn()
  id!: string;

  @Column()
  amount!: number;

  @Column()
  animalId!: string;

  @Column()
  createdAt!: Date;

  @Column()
  updatedAt!: Date;

  @ManyToOne(() => AnimalEntity, (animal) => animal.dailyAmountOfMilk)
  animal!: AnimalEntity;
}
