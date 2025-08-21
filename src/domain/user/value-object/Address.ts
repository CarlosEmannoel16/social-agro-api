export class Address {
  constructor(
    public street: string,
    public number: string,
    public complement: string,
    public district: string,
    public city: string,
    public state: string,
    public zipCode: string
  ) {}

  create(data: {
    street: string;
    number: string;
    complement: string;
    district: string;
    city: string;
    state: string;
    zipCode: string;
  }) {
    return new Address(
      data.street,
      data.number,
      data.complement,
      data.district,
      data.city,
      data.state,
      data.zipCode
    );
  }
}
