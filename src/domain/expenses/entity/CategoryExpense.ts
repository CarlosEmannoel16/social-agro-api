export class CategoryExpense {
  private _id: string;
  private _name: string;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
  }

  validate(): void {
    const errors = [];
    if (!this._id) errors.push("[CategoryExpense] Category id is required");
    if (!this._name) errors.push("[CategoryExpense] Category name is required");

    if (errors.length) throw new Error(errors.join(", "));
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }
}
