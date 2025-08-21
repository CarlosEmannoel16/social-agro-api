export class MilkProduction {
  constructor(
    public dateOfProduction: Date,
    public quantityOfMilk: number,
    public animalId: string,
    public price: number
  ) {}

  get amount() {
    return (this.price / 100) * this.quantityOfMilk;
  }

  get month() {
    return this.dateOfProduction.getMonth();
  }
}
