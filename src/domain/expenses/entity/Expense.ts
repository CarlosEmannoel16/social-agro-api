import { CategoryExpense } from "../valueObjects/CategoryExpense";

export class Expense {
  private _id: string;
  private _date: Date;
  private _amount: number;
  private _description: string;
  private _animalId: string;
  private _Category: CategoryExpense;

  constructor(
    id: string,
    amount: number,
    animalId: string,
    category: CategoryExpense,
    description: string,
    date: Date
  ) {
    this._id = id;
    this._date = date;
    this._amount = amount;
    this._animalId = animalId;
    this._Category = category;
    this._description = description;
  }

  validate(): void {
    const errors = [];
    if (!this._id) errors.push("[Expense] Expense id is required");
    if (!this._date) errors.push("[Expense] Expense date is required");
    if (!this._amount) errors.push("[Expense] Expense amount is required");
    if (!this._animalId) errors.push("[Expense] Expense animalId is required");
    if (!this._Category) errors.push("[Expense] Expense category is required");
    if (!this._description)
      errors.push("[Expense] Expense description is required");

    if (errors.length) throw new Error(errors.join(", "));
  }

  get id(): string {
    return this._id;
  }

  get date(): Date {
    return this._date;
  }

  get amount(): number {
    return this._amount;
  }

  get description(): string {
    return this._description;
  }

  get animalId(): string {
    return this._animalId;
  }

  get category(): CategoryExpense {
    return this._Category;
  }
}
