export interface InputCreateUserFactory {
  name: string;
  email: string;
  password: string;
  dateOfBirth?: Date;
  profileUrl?: string;
  id?: string;
}
