import { UserRepositoryInterface } from "../repository/UserRepositoryInterface";

export interface IValidadeUserEmail {
  execute(email: string): Promise<void>;
}

export class ValidateUserEmail implements IValidadeUserEmail {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async execute(email: string) {
    const emailRegex = /\S+@\S+\.\S+/;
    if (emailRegex.test(email)) {
      const user = await this.userRepository.findByEmail(email);
      if (user) {
        throw new Error("Email already exists");
      }
      return;
    }

    throw new Error("Invalid email");
  }
}
