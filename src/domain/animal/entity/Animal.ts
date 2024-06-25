import { weightAnimal } from "./WeightAnimal";

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
  private _images: string[] = [];
  private _dateOfCreation!: Date;
  private _dateOfUpdate!: Date;
  private _weight!: weightAnimal[];

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
    const errors = [];
    if (!this._id) errors.push("[Animal] Id is required");
    if (!this._ownerId) errors.push("[Animal] Owner is required");
    if (!this._dateOfBirth) errors.push("[Animal] Date of birth is required");

    if (errors.length > 0) throw new Error(errors.join(", "));
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

  get createdAt(): Date {
    return this._dateOfCreation;
  }

  get updatedAt(): Date {
    return this._dateOfUpdate;
  }

  get image(): string[] {
    return this._images;
  }

  makeItPublic() {
    this._isPublic = true;
  }

  getAgeAnimal(): string {
    const dateCurrent = new Date();
    const dateOfBirth = new Date(this._dateOfBirth);
    const ms = dateCurrent.getTime() - new Date(this._dateOfBirth).getTime();
    const age = Math.floor(ms / (365.25 * 24 * 60 * 60 * 1000));
    var diferencaMeses =
      (dateCurrent.getFullYear() - dateOfBirth.getFullYear()) * 12 +
      (dateCurrent.getMonth() - dateOfBirth.getMonth());
    var yarns = Math.floor(diferencaMeses / 12);
    var months = diferencaMeses % 12;

    return `${yarns} Anos e  ${months} meses`;
  }

  addImageUrl(image: string[]) {
    if (this._images) this._images = [...this._images, ...image];
  }

  addWeight(weight: weightAnimal) {
    if (!this._weight) this._weight = [];
    this._weight.push(weight);
  }

  getWeight(): any {
    return (
      this._weight?.map((weight) => {
        return {
          weight: weight.weight,
          dateOfRegister: weight.getDateOfRegisterPTBR(),
        };
      }) || []
    );
  }
}
