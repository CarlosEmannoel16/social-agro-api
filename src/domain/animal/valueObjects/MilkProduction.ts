export class MilkProduction {
  private readonly dateOfProduction: Date;
  private readonly quantityOfMilk: number;

  constructor(dateOfProduction: Date, quantityOfMilk: number) {
    this.dateOfProduction = dateOfProduction;
    this.quantityOfMilk = quantityOfMilk;
  }

  get date(): Date {
    return this.dateOfProduction;
  }

  get quantity(): number {
    return this.quantityOfMilk;
  }
}
