export interface InputCreateUserDTO {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  imageUrl?: string;
}

export interface OutputCreateUserDTO {
  id: string;
  name: string;
  email: string;
  token: string;
}

export interface InputValidateUserDTO {
  email: string;
  password: string;
  name: string;
}
