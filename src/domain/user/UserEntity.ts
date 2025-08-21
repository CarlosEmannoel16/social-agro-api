import { Address } from "./value-object/Address";

export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string,
    public address?: Address,
    public profileUrl?: string,
    public phones?: string[],
    public dateOfBirth?: Date,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}

  static create(data: {
    id: string;
    name: string;
    email: string;
    password: string;
    address?: Address;
    profileUrl?: string;
    phones?: string[];
    dateOfBirth?: Date;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    return new User(
      data.id,
      data.name,
      data.email,
      data.password,
      data.address,
      data.profileUrl,
      data.phones,
      data.dateOfBirth,
      data.createdAt,
      data.updatedAt
    );
  }
}
