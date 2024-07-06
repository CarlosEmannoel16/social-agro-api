import { User } from "@/domain/user/entity/User";
import { UserFactory } from "@/domain/user/factory/UserFactory";
import { UserRepositoryInterface } from "@/domain/user/repository/UserRepositoryInterface";
import { UserEntity } from "@/infra/ORM/UserEntity";
import { DatabaseInitializer } from "@/loaders/database";
export default class UserRepository implements UserRepositoryInterface {
  async checkIfExistsByEmail(email: string): Promise<boolean> {
    const result = await DatabaseInitializer.db()
      .getRepository(UserEntity)
      .query(`SELECT id FROM user WHERE email = ${email}`);

    return result.length > 0;
  }
  async checkIfExistsByPhone(phone: string): Promise<boolean> {
    const result = await DatabaseInitializer.db()
    .getRepository(UserEntity)
    .query(`SELECT id FROM user WHERE phone = ${phone}`);

  return result.length > 0;
  }
  async addImage(imageUrl: string, userId: string): Promise<void> {
    await DatabaseInitializer.db().getRepository(UserEntity).update(
      {
        id: userId,
      },
      {
        profileUrl: imageUrl,
      }
    );
  }
  async findByEmail(email: string): Promise<User | undefined> {
    const result = await DatabaseInitializer.db()
      .getRepository(UserEntity)
      .findOne({
        where: {
          email,
        },
      });

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
    const data = await DatabaseInitializer.db().getRepository(UserEntity).save({
      email: item.email,
      name: item.name,
      password: item.password,
      id: item.id,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      dateOfBirth: item.dateOfBirth,
    });

    const user = new User(
      data.id,
      data.name,
      data.email,
      data.password,
      data.dateOfBirth,
      data.createdAt,
      data.updatedAt
    );

    return user;
  }
  async update(item: User): Promise<void> {
    await DatabaseInitializer.db().getRepository(UserEntity).update(item.id, {
      email: item.email,
      password: item.password,
      profileUrl: item.profileUrl,
    });
  }
  async find(id: string): Promise<User> {
    try {
      const data = await DatabaseInitializer.db()
        .getRepository(UserEntity)
        .findOne({
          where: {
            id,
          },
        });

      if (!data) throw new Error("User not found");

      const user = UserFactory.createNewUser({
        email: data.email,
        name: data.name,
        password: data.password,
        id: data.id,
      });

      return user;
    } catch (error) {
      throw new Error("User not found");
    }
  }
  findAll(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }

  async findByName(name: string): Promise<User[]> {
    const result = await DatabaseInitializer.db()
      .getRepository(UserEntity)
      .find({
        where: {
          name,
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
