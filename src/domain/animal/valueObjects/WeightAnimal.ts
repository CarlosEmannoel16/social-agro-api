export class WeightAnimal {
  constructor(public weight: number, public dateOfRegister: Date) {}

  create(data: { weight: number; dateOfRegister: Date }) {
    return new WeightAnimal(data.weight, data.dateOfRegister);
  }

  get dateOfRegisterPTBR() {
    const day = this.dateOfRegister.getDate();
    const month = this.dateOfRegister.getMonth() + 1;
    const year = this.dateOfRegister.getFullYear();
    return `${day}/${month > 9 ? month : `0${month}`}/${year}`;
  }
}
