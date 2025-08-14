import { Address } from "../value-object/Address";
import { Phone } from "../value-object/Phone";

export class User {
  private _id: string;
  private _name: string;
  private _email: string;
  private _password: string;
  public _address!: Address;
  private _dateOfBirth!: Date;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _profileUrl!: string;
  private _phones: Phone[] | [] = [];

  constructor(
    id: string,
    name: string,
    email: string,
    password: string,
    dateOfBirth: Date,
    createdAt: Date,
    updatedAt: Date
    
  ) {
    this._id = id;
    this._name = name;
    this._email = email;
    this._password = password;
    this._dateOfBirth = dateOfBirth;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
    this._phones = [];
    this.validate();
  }
  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get id(): string {
    return this._id;
  }

  get password(): string {
    return this._password;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get phones(): Phone[] {
    return this._phones;
  }

  get dateOfBirth(): Date {
    return this._dateOfBirth;
  }

  get profileUrl(): string {
    return this._profileUrl || "";
  }

  set profileUrl(profileUrl: string) {
     this._profileUrl =profileUrl
  }

  validate() {
    if (!this._id) throw new Error("id is required");
    if (!this._name) throw new Error("Name is required");
    if (!this._email) throw new Error("Email is required");
    if (!this._password) throw new Error("Password is required");
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  changeEmail(email: string) {
    this._email = email;
    this.validate();
  }

  addPhone(phones: Phone[]) {
    phones?.forEach((phone) => {
      this.phones.push(phone);
    });
  }

  changeProfileUrl(profileUrl: string) {
    this._profileUrl = profileUrl;
  }
}
