import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { AnimalExpensesEntity } from "./AnimalExpensesEntity";

@Entity({ name: "category_expenses" })
export class CategoryExpensesEntity {
  @Column()
  @PrimaryColumn()
  id!: string;

  @Column()
  description!: string;

  @ManyToOne(() => AnimalExpensesEntity, (animal) => animal.category)
  expenses!: AnimalExpensesEntity;
}
