export class Phone {
  private _number: string;
  private _ddd: string;
  private _dateOfCreation: Date;
  private _dateOfUpdate: Date;

  constructor(number: string, dateOfCreation?: Date, dateOfUpdate?: Date) {
    this._number = number;
    this._dateOfCreation = dateOfCreation || new Date();
    this._dateOfUpdate = dateOfUpdate || new Date();
    this._ddd = this._number.substring(0, 2);
    this.validate();
  }

  validate() {
    if (!this._number) throw new Error("Number is required");
    if (this._number.length > 11) throw new Error("Number is invalid");
    if (this._number.length < 10) throw new Error("Number is invalid");
    if (this._ddd.length < 2) throw new Error("DDD is invalid");
    if (!this._ddd) throw new Error("DDD is required");
  }

  get number(): string {
    return this._number;
  }

  get ddd(): string {
    return this._ddd;
  }

  get dateOfCreation(): Date {
    return this._dateOfCreation;
  }

  get dateOfLastUpdated(): Date {
    return this._dateOfCreation;
  }
}
