export class WeightAnimal {
  constructor(public weight: number, public dateOfRegister: Date, public id: number) {}

  create(data: { weight: number; dateOfRegister: Date, id: number }): WeightAnimal {
    return new WeightAnimal(data.weight, data.dateOfRegister, data.id);
  }

  get dateOfRegisterPTBR() {
    const day = this.dateOfRegister.getDate();
    const month = this.dateOfRegister.getMonth() + 1;
    const year = this.dateOfRegister.getFullYear();
    return `${day}/${month > 9 ? month : `0${month}`}/${year}`;
  }
}
