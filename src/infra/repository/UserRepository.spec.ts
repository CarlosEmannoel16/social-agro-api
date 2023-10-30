import { prismaMock } from "../db/prisma/config/SingletonPrismaTest";
import prisma from "../db/prisma/config/PrismaClient";
import UserRepository from "./UserRepository";
import { User } from "../../domain/entity/User";
import { Phone } from "../../domain/entity/Phone";
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


  prismaMock.user.create.mockResolvedValue({
    email: user.email,
    createdAt: user.createdAt,
    id: user.id,
    name: user.name,
    password: user.password,
    updatedAt: user.updatedAt,

  });

  const phone = new Phone("88997018711")
  user.addPhone([phone])

  const result = await userRepository.create(user)
  console.log(result)

  await expect(userRepository.create(user)).resolves.toEqual(user);
});
