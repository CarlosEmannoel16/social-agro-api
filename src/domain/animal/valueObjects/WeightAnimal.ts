export class weightAnimal {
  constructor(public weight: number, public dateOfRegister: Date) {}

  get dateOfRegisterPTBR() {
    const day = this.dateOfRegister.getDate();
    const month = this.dateOfRegister.getMonth() + 1;
    const year = this.dateOfRegister.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
