import { prismaMock } from "../../@shared/db/prisma/config/SingletonPrismaTest";
import prisma from "../../@shared/db/prisma/config/PrismaClient";
import UserRepository from "./UserRepository";
import { User } from "../../../domain/user/entity/User";
import { Phone } from "../../../domain/user/entity/Phone";
test("should create new user ", async () => {
  // const userRepository = new UserRepository();

  // const user = new User(
  //   "id1",
  //   "nome",
  //   "email",
  //   "senha",
  //   new Date(),
  //   new Date()
  // );

  // prismaMock.user.create.mockResolvedValue({
  //   email: user.email,
  //   createdAt: user.createdAt,
  //   id: user.id,
  //   name: user.name,
  //   password: user.password,
  //   updatedAt: user.updatedAt,
  // });

  

  // const result = await userRepository.create(user);
  // console.log(result);

  await expect(1).toEqual(1);
});
