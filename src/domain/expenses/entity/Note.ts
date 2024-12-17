export class Note {
  private _id: string;
  private _color: string;
  private _text: string;
  private _title: string;
  private _animalId: string;

  constructor(
    id: string,
    color: string,
    text: string,
    title: string,
    animalId: string
  ) {
    this._id = id;
    this._color = color; 
    this._text = text;
    this._title = title;
    this._animalId = animalId;

    this.validate();
  }

  validate(): void {
    const errors = [];
    if (!this._id) errors.push("Id is required");
    if (!this._color) errors.push("Color is required");
    if (!this._text) errors.push("Text is required");
    if (!this._title) errors.push("Title is required");
    if (!this._animalId) errors.push("AnimalId is required");
    if (errors.length > 0) throw new Error(errors.join(", "));
  }

  get id(): string {
    return this._id;
  }

  get color(): string {
    return this._color;
  }

  get text(): string {
    return this._text;
  }

  get title(): string {
    return this._title;
  }

  get animalId(): string {
    return this._animalId;
  }
}
