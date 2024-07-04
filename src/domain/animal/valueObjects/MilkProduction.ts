export class MilkProduction {
  private readonly _dateOfProduction: Date;
  private readonly _quantityOfMilk: number;
  private _animalId: string;

  constructor(
    dateOfProduction: Date,
    quantityOfMilk: number,
    animalId: string
  ) {
    this._dateOfProduction = dateOfProduction;
    this._quantityOfMilk = quantityOfMilk;
    this._animalId = animalId;
  }

  get date(): Date {
    return this._dateOfProduction;
  }

  get quantity(): number {
    return this._quantityOfMilk;
  }

  get animalId(): string {
    return this._animalId;
  }
}
