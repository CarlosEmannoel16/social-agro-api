import { UserRepositoryInterface } from "@/domain/user/repository/UserRepositoryInterface";
import { UserEntity } from "@/infra/ORM/UserEntity";
import { DatabaseInitializer } from "@/loaders/database";
export default class UserRepository implements UserRepositoryInterface {
  async addImage(imageUrl: string, userId: string): Promise<void> {
    await DatabaseInitializer.db().getRepository(UserEntity).update({
      id: userId,
    }, {
      profileUrl: imageUrl,
    });
  }
  async findByEmail(email: string): Promise<User | undefined> {
    const result = await dataBase.user.findUnique({ where: { email } });

    if (!result) return undefined;

    const user = UserFactory.createNewUser({
      email: result?.email,
      name: result?.name,
      password: result?.password,
      id: result?.id,
    });

    return user;
  }
  async create(item: User): Promise<User> {
    const data = await dataBase.user.create({
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
    await dataBase.user.update({
      data: item,
      where: {
        id: item.id,
      },
    });
  }
  async find(id: string): Promise<User> {
    try {
      const data = await dataBase.user.findUnique({
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

  async findByName(name: string): Promise<User[]> {
    const result = await dataBase.user.findMany({
      where: {
        name: name,
      },
    });

    return result.map((resultItem) =>
      UserFactory.createNewUser({
        email: resultItem?.email,
        name: resultItem.name,
        password: resultItem.password,
        id: resultItem.id,
      })
    );
  }
}
