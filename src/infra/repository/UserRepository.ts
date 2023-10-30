import { Phone } from "../../domain/entity/Phone";
import { User } from "../../domain/entity/User";
import { UserRepositoryInterface } from "../../domain/repository/UserRepositoryInterface";
import prisma from "../db/prisma/config/PrismaClient";
export default class UserRepository implements UserRepositoryInterface {
  findByEmail(email: string): Promise<User | undefined> {
    throw new Error("Method not implemented.");
  }
  async create(item: User): Promise<User> {
    const data = await prisma.user.create({
      data: {
        email: item.email,
        name: item.name,
        password: item.password,
        id: item.id,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        Phones: {
          createMany: {
            data: item.phones.map((phone) => ({
              phone: phone.number,
              createdAt: phone.dateOfCreation,
              updatedAt: phone.dateOfLastUpdated,
            })),
          },
        },
      },
      include: {
        Phones: true,
      },
    });

    const user = new User(
      data.id,
      data.name,
      data.email,
      data.password,
      data.createdAt,
      data.updatedAt
    );

    const phones = data.Phones?.map(
      (phone) => new Phone(phone.phone, phone.createdAt, phone.updatedAt)
    );
    user.addPhone(phones);

    return user;
  }
  async update(item: User): Promise<void> {
    await prisma.user.update({
      data: item,
      where: {
        id: item.id,
      },
    });
  }
  find(id: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
}
