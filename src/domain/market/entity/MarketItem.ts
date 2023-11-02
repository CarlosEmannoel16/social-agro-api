export class MarketItem {
  private _id: string;
  private _title: string;
  private _dateOfPost: Date;
  private _description?: string;
  private _price: number;
  private _idAuthor: string;

  constructor(id: string, title: string, dateOfPost: Date, price: number, idAuthor: string) {
    this._id = id;
    this._title = title;
    this._dateOfPost = dateOfPost;
    this._price = price;
    this._idAuthor = idAuthor;
    this.validate();
  }

  validate() {
    if (!this._id) throw new Error("Id is required");
    if (!this._title) throw new Error("Title is required");
    if (!this._dateOfPost) throw new Error("DateOfPost is required");
    if (!this._price) throw new Error("Price is required");
    if (this._price < 0) throw new Error("Price must be positive");
    if (this._description && this._description.length > 100)
      throw new Error("Description must be up to 100 characters");
    if(!this._idAuthor) throw new Error("IdAuthor is required");
   
  }

  get description(): string | undefined {
    return this._description;
  }

  get id(): string {
    return this._id;
  }

  changeDescription(description: string) {
    this._description = description;
    this.validate();
  }
}
