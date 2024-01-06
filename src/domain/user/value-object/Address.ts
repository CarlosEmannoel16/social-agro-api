export class Address {
  
  private street: string;
  private number: string;
  private complement: string;
  private district: string;
  private city: string;
  private state: string;
  private zipCode: string;

  constructor(
    street: string,
    number: string,
    complement: string,
    district: string,
    city: string,
    state: string,
    zipCode: string
  ) {
    this.street = street;
    this.number = number;
    this.complement = complement;
    this.district = district;
    this.city = city;
    this.state = state;
    this.zipCode = zipCode;
  }
}
