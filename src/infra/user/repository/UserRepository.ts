import { Phone } from "../../../domain/user/entity/Phone";
import { User } from "../../../domain/user/entity/User";
import PrismaClient from "../../@shared/db/prisma/config/PrismaClient";
import { UserRepositoryInterface } from "../../../domain/user/repository/UserRepositoryInterface";
import { UserFactory } from "../../../domain/user/factory/UserFactory";
export default class UserRepository implements UserRepositoryInterface {
  async findByEmail(email: string): Promise<User | undefined> {
    const result = await PrismaClient.user.findUnique({ where: { email } });

    if (!result) return undefined;

    const user = UserFactory.createNewUser({
      email: result?.email,
      name: result?.name,
      password: result?.password,
    });

    return user;
  }
  async create(item: User): Promise<User> {
    const data = await PrismaClient.user.create({
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
    await PrismaClient.user.update({
      data: item,
      where: {
        id: item.id,
      },
    });
  }
  async find(id: string): Promise<User> {
    try {
      const data = await PrismaClient.user.findUnique({
        where: {
          id,
        },
        include: {
          Phones: true,
        },
      });

      if (!data) throw new Error("User not found");

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
    } catch (error) {
      throw new Error("User not found");
    }
  }
  findAll(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
}
