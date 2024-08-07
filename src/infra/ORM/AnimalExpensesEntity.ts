import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { AnimalEntity } from "./AnimalEntity";
import { CategoryExpensesEntity } from "./CategoryExpensesEntity";

@Entity({name: "animal_expenses"})
export class AnimalExpensesEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  description!: string;

  @Column()
  amount!: number;

  @Column()
  categoryId!: string;

  @Column()
  animalId!: string;

  @Column()
  date!: Date;

  @ManyToOne(() => AnimalEntity, (animal) => animal.expenses)
  animal!: AnimalEntity;

  @ManyToOne(() => CategoryExpensesEntity, (category) => category.expenses)
  category!: CategoryExpensesEntity;
}
