export class Animal {
  private _id: string;
  private _surname!: string;
  private _isPublic: boolean = false;
  private _dateOfBirth!: Date;
  private _motherId!: string;

  constructor(id: string, dateOfBirth: Date, fatherId: string) {
    this._id = id;
    this._dateOfBirth = dateOfBirth;
    this._motherId = fatherId;
    this.validate();
  }

  validate() {
    if (!this._id) throw new Error("Id is required");
    if (!this._dateOfBirth) throw new Error("Date of birth is required");
    if (!this._motherId) throw new Error("MotherId id is required");
  }

  set surname(name: string) {
    if (!name) throw new Error("Name is required");
    this._surname = name;
  }

  get surname(): string {
    return this._surname;
  }
  get isPublic(): boolean {
    return this._isPublic;
  }

  makeItPublic() {
    this._isPublic = true;
  }
}
