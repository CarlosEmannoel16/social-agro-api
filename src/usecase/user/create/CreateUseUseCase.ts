import { UserFactory } from "../../../domain/user/factory/UserFactory";
import { UserRepositoryInterface } from "../../../domain/user/repository/UserRepositoryInterface";
import { InputCreateUserDTO, OutputCreateUserDTO } from "./DTOs";
import jwt from "jsonwebtoken";

export default class CreateUserUseCase  {
  constructor(private readonly userRepository: UserRepositoryInterface) {}
  async execute(data: InputCreateUserDTO): Promise<OutputCreateUserDTO> {
    //Temp
    const privateKey = "eee88@09955%$#/";

    const user = UserFactory.createNewUser({
      email: data.email,
      name: data.name,
      password: data.password,
    });

    const userWithEmail = await this.userRepository.findByEmail(user.email);
    if (userWithEmail) throw new Error("Email informado não está disponível");

    await this.userRepository.create(user);

     const token = jwt.sign(
      {
        id: user.id,
      },
      privateKey,
      { expiresIn: "48h", algorithm: "HS256" }
    );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    };
  }
}
