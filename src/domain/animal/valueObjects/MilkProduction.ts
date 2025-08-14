export class MilkProduction {
  private readonly _dateOfProduction: Date;
  private readonly _quantityOfMilk: number;
  private _animalId: string;
  private _price: number;

  constructor(
    dateOfProduction: Date,
    quantityOfMilk: number,
    animalId: string,
    price: number
  ) {
    this._dateOfProduction = dateOfProduction;
    this._quantityOfMilk = quantityOfMilk;
    this._animalId = animalId;
    this._price = price;
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

  get amount() {
    return (this._price / 100) * this.quantity;
  }

  get month(){
    return this._dateOfProduction.getMonth()
  }
}
