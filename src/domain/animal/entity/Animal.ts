export enum TypeAnimal {
  OX = "OX",
  COW = "COW",
}

export class Animal {
  private _id: string;
  private _surname!: string;
  private _isPublic: boolean = false;
  private _dateOfBirth!: Date;
  private _fatherId!: string;
  private _motherId!: string;
  private _type!: TypeAnimal;
  private _breed!: string;
  private _ownerId!: string;

  constructor(
    id: string,
    dateOfBirth: Date,
    type: TypeAnimal,
    breed: string,
    ownerId: string
  ) {
    this._id = id;
    this._dateOfBirth = dateOfBirth;
    this._type = type;
    this._breed = breed;
    this._ownerId = ownerId;
    this.validate();
  }

  validate() {
    if (!this._id) throw new Error("Id is required");
    if (!this._dateOfBirth) throw new Error("Date of birth is required");
    if (!this._ownerId) throw new Error("Owner is required");
  }

  set surname(name: string) {
    if (this._surname) throw new Error("Surname already set");
    if (!name) throw new Error("Name is required");
    this._surname = name;
  }

  set idFather(id: string) {
    if (this._fatherId) throw new Error("Father already set");
    if (!id) throw new Error("Id is required");
    this._fatherId = id;
  }

  set IdMother(id: string) {
    if (this._motherId) throw new Error("Mother already set");
    if (!id) throw new Error("Id is required");
    this._motherId = id;
  }

  set breed(breed: string) {
    if (!breed) throw new Error("Breed is required");
    this._breed = breed;
  }

  get surname(): string {
    return this._surname;
  }
  get isPublic(): boolean {
    return this._isPublic;
  }

  get dateOfBirth(): Date {
    return this._dateOfBirth;
  }

  get id(): string {
    return this._id;
  }

  get ownerId(): string {
    return this._ownerId;
  }

  get breed(): string {
    return this._breed;
  }

  get type(): TypeAnimal {
    return this._type;
  }

  get fatherId(): string {
    return this._fatherId;
  }
  get motherId(): string {
    return this._motherId;
  }

  makeItPublic() {
    this._isPublic = true;
  }

  getAgeAnimal(): string {
    const dateCurrent = new Date();
    this._dateOfBirth;
    const months = dateCurrent.getMonth() - this._dateOfBirth.getMonth();
    const age = dateCurrent.getFullYear() - this._dateOfBirth.getFullYear();
    return `${age} anos e ${months} meses`;
  }
}
