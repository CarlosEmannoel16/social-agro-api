export class weightAnimal {
  private _weight: number;
  private _dateOfRegister: Date;
  constructor(weight: number, dateOfRegister: Date) {
    this._weight = weight;
    this._dateOfRegister = dateOfRegister;
  }

  validate() {
    if (this._weight < 0) throw new Error("Peso não pode ser negativo");
    if (this._dateOfRegister > new Date())
      throw new Error("Data de registro não pode ser maior que a data atual");
    if (!this._dateOfRegister)
      throw new Error("Data de registro não pode ser vazia");
    if (!this._weight) throw new Error("Peso não pode ser vazio");
  }
  get weight() {
    return this._weight;
  }
  get dateOfRegister() {
    return this._dateOfRegister;
  }

  getDateOfRegisterPTBR() {
    const day = this._dateOfRegister.getDate();
    const month = this._dateOfRegister.getMonth() + 1;
    const year = this._dateOfRegister.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
