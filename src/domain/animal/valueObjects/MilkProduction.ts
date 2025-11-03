export class MilkProduction {
  constructor(
    public dateOfProduction: Date,
    public quantityOfMilk: number,
    public animalId: string,
    public price: number,
    public id?: number,
  ) {}

  create(data: {
    dateOfProduction: Date;
    quantityOfMilk: number;
    animalId: string;
    price: number;
    id?: number;
  }) {
    return new MilkProduction(
      data.dateOfProduction,
      data.quantityOfMilk,
      data.animalId,
      data.price,
      data.id
    );
  }

  get amount() {
    return (this.price / 100) * this.quantityOfMilk;
  }

  get month() {
    return this.dateOfProduction.getMonth();
  }
}
