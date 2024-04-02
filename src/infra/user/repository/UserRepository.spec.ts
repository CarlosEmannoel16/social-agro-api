import { prismaMock } from "../../shared/db/prisma/config/SingletonPrismaTest";
import prisma from "../../shared/db/prisma/config/prismaClient";
import UserRepository from "./UserRepository";
import { User } from "../../../domain/user/entity/User";
import { Phone } from "../../../domain/user/entity/Phone";
describe("User Repository Unit Tests", () => {
  test("should create new user ", async () => {
    const userRepository = new UserRepository();

    const user = new User(
      "id1",
      "nome",
      "email",
      "senha",
      new Date(),
      new Date()
    );

    prismaMock.user.create.mockResolvedValueOnce({
      email: user.email,
      createdAt: user.createdAt,
      id: user.id,
      name: user.name,
      password: user.password,
      updatedAt: user.updatedAt,
      profileUrl: null,
    });

    const result = await userRepository.create(user);

    expect(result).toEqual(user);
  });

  test.skip("should find user by id", async () => {
    const user = new User(
      "id1",
      "nome",
      "email",
      "senha",
      new Date(),
      new Date()
    );

    const userRepository = new UserRepository();

    const result = await userRepository.find(user.id);
    console.log(result);

    expect(result.email).toEqual(user.email);
    expect(result.id).toEqual(user.id);
    expect(result.name).toEqual(user.name);
    expect(result.password).toEqual(user.password);
    expect(result.createdAt).toEqual(user.createdAt);
  });
});
