export interface InputAuthUseCase {
  email: string;
  password: string;
}

export interface OutputAuthUseCase {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}
