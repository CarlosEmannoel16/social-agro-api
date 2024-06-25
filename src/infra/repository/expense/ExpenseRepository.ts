import { Expense } from "@/domain/expenses/entity/Expense";
import { ExpenseFactory } from "@/domain/expenses/factories/expenseFactory";
import { ExpenseRepositoryInterface } from "@/domain/expenses/repository/ExpenseProtocolRepository";
import { dataBase } from "../../infra/shared/db/prisma/config/prismaClient";

export class ExpenseRepository implements ExpenseRepositoryInterface {
  async delete(id: string): Promise<void> {
    await dataBase.animalExpenses.delete({
      where: {
        id: id,
      },
    });
  }
  async create(item: Expense): Promise<Expense> {
    await dataBase.animalExpenses.create({
      data: {
        amount: item.amount,
        animalId: item.animalId,
        date: item.date,
        description: item.description,
        categoryId: item.category.id,
        id: item.id,
      },
    });

    return item;
  }
  async update(item: Expense): Promise<void> {
    await dataBase.animalExpenses.update({
      where: { id: item.id },
      data: {
        amount: item.amount,
        animalId: item.animalId,
        date: item.date,
        description: item.description,
        categoryId: item.category.id,
        id: item.id,
      },
    });
  }
  async findAll(userId: string): Promise<Expense[]> {
    const result = await dataBase.animalExpenses.findMany({
      include: {
        Category: true,
      },
    });

    if (!result) return [];

    return ExpenseFactory.createMap(
      result.map((item) => ({
        amount: item.amount,
        animalId: item.animalId as string,
        category: {
          id: item.categoryId as string,
          name: item.Category?.name as string,
        },
        date: item.date,
        description: item.description,
        id: item.id as string,
      }))
    );
  }
}
