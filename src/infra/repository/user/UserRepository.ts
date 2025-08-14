import { User } from "@/domain/user/entity/User";
import { UserFactory } from "@/domain/user/factory/UserFactory";
import { UserRepositoryInterface } from "@/domain/user/repository/UserRepositoryInterface";
import { db } from "@/infra/kysely";

export default class UserRepository implements UserRepositoryInterface {
  checkIfExistsByPhone(phone: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  async checkIfExistsByEmail(email: string): Promise<boolean> {
    const result = await db
      .selectFrom("user")
      .select("id")
      .where("email", "=", email)
      .executeTakeFirst();

    return !!result;
  }

  async addImage(imageUrl: string, userId: string): Promise<void> {
    await db
      .updateTable("user")
      .set({
        profile_url: imageUrl,
      })
      .where("id", "=", userId)
      .execute();
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const result = await db
      .selectFrom("user")
      .selectAll()
      .where("email", "=", email)
      .executeTakeFirst();

    if (!result) return undefined;

    const user = UserFactory.createNewUser({
      id: result.id,
      email: result.email,
      name: result.name,
      password: result.password,
    });

    return user;
  }

  async create(item: User): Promise<User> {
    const data = await db
      .insertInto("user")
      .values({
        id: item.id,
        email: item.email,
        name: item.name,
        password: item.password,
        date_of_birth: item.dateOfBirth,
        created_at: item.createdAt,
        updated_at: item.updatedAt,
        profile_url: item.profileUrl,
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    const user = new User(
      data.id,
      data.name,
      data.email,
      data.password,
      data.date_of_birth,
      data.created_at,
      data.updated_at
    );

    return user;
  }

  async update(item: {
    email?: string
    name?: string
    profileImage?:string
    id: string
  }): Promise<void> {
    await db
      .updateTable("user")
      .set({

        email: item.email,
        profile_url: item.profileImage,
        name: item.name,
        updated_at: new Date(),
      })
      .where("id", "=", item.id)
      .execute();
  }

  async find(id: string): Promise<User> {
    const data = await db
      .selectFrom("user")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirst();

    if (!data) {
      throw new Error("User not found");
    }

    const user = UserFactory.createNewUser({
      id: data.id,
      email: data.email,
      name: data.name,
      password: data.password,
      dateOfBirth: data.date_of_birth,
      profileUrl: data.profile_url
    });

    return user;
  }

  async findAll(): Promise<User[]> {
    const result = await db.selectFrom("user").selectAll().execute();

    return result.map((data) =>
      UserFactory.createNewUser({
        id: data.id,
        email: data.email,
        name: data.name,
        password: data.password,
        dateOfBirth: data.date_of_birth,
      })
    );
  }

  async findByName(name: string): Promise<User[]> {
    const result = await db
      .selectFrom("user")
      .selectAll()
      .where("name", "=", name)
      .execute();

    return result.map((data) =>
      UserFactory.createNewUser({
        id: data.id,
        email: data.email,
        name: data.name,
        password: data.password,
        dateOfBirth: data.date_of_birth,
      })
    );
  }
}
