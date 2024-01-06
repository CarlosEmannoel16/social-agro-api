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
}
