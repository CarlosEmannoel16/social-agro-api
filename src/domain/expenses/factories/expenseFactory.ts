import { Expense } from "../entity/Expense";
import { CategoryExpense } from "../valueObjects/CategoryExpense";

interface factoryDto {
  id: string;
  amount: number;
  animalId: string;
  category: {
    id: string;
    name: string;
  };
  description: string;
  date: Date;
}

export class ExpenseFactory {
  static create(data: factoryDto): Expense {
    const expense = new Expense(
      data.id,
      data.amount,
      data.animalId,
      new CategoryExpense(data.category.id, data.category.name),
      data.description,
      data.date
    );
    expense.validate();
    return expense;
  }

  static createMap(data: factoryDto[]): Expense[] {
    return data.map((item) => this.create(item));
  }
}
