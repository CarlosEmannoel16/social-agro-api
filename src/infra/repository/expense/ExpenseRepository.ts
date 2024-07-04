import { Expense } from "@/domain/expenses/entity/Expense";
import { ExpenseFactory } from "@/domain/expenses/factories/expenseFactory";
import { ExpenseRepositoryInterface } from "@/domain/expenses/repository/ExpenseProtocolRepository";
import { AnimalExpensesEntity } from "@/infra/ORM/AnimalExpensesEntity";
import { DatabaseInitializer } from "@/loaders/database";
export class ExpenseRepository implements ExpenseRepositoryInterface {
  async delete(id: string): Promise<void> {
    await DatabaseInitializer.db()
      .getRepository(AnimalExpensesEntity)
      .delete(id);
  }

  async create(item: Expense): Promise<Expense> {
    const repository =
      DatabaseInitializer.db().getRepository(AnimalExpensesEntity);

    await repository.save({
      amount: item.amount,
      animalId: item.animalId,
      categoryId: item.category.id,
      description: item.description,
    });

    return item;
  }

  async update(item: Expense): Promise<void> {
    const repository =
      DatabaseInitializer.db().getRepository(AnimalExpensesEntity);

    await repository.update(item.id, {
      animalId: item.animalId,
      categoryId: item.category.id,
      description: item.description,
      amount: item.amount,
      category: item.category,
    });
  }
  
  async findAll(): Promise<Expense[]> {
    const repository =
      DatabaseInitializer.db().getRepository(AnimalExpensesEntity);

    const result = await repository.find();

    if (!result) return [];

    return ExpenseFactory.createMap(
      result.map((item) => ({
        amount: item.amount,
        animalId: item.animalId as string,
        category: {
          id: item.categoryId as string,
          name: item.category?.description as string,
        },
        date: item.date,
        description: item.description,
        id: item.id as string,
      }))
    );
  }
}
