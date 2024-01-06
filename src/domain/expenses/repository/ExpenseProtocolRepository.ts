import { RepositoryInterface } from "@/domain/@shared/repository/RepositoryInsterface";
import { Expense } from "../entity/Expense";

export interface ExpenseRepositoryInterface
  extends RepositoryInterface<Expense> {}
