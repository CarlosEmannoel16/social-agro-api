import {
  InputCreateUserRepository,
  OutputCreateUserRepository,
  UserRepositoryInterface,
} from '@/domain/user/interfaces/UserRepositoryInterface';
import { User } from '@/domain/user/UserEntity';
import { db } from '@/infra/kysely';
import { v4 } from 'uuid';

export default class UserRepository implements UserRepositoryInterface {
  async checkIfExistsByEmail(email: string): Promise<boolean> {
    const result = await db
      .selectFrom('user')
      .select('id')
      .where('email', '=', email)
      .executeTakeFirst();

    return !!result;
  }

  async addImage(imageUrl: string, userId: string): Promise<void> {
    await db
      .updateTable('user')
      .set({
        profile_url: imageUrl,
      })
      .where('id', '=', userId)
      .execute();
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const result = await db
      .selectFrom('user')
      .selectAll()
      .where('email', '=', email)
      .executeTakeFirst();

    if (!result) return undefined;

    const user = User.create({
      id: result.id,
      email: result.email,
      name: result.name,
      password: result.password,
    });

    return user;
  }

  async create(
    item: InputCreateUserRepository,
  ): Promise<OutputCreateUserRepository> {
    const currentDate = new Date();
    const id = v4();
    const data = await db
      .insertInto('user')
      .values({
        id,
        email: item.email,
        name: item.name,
        password: item.password,
        created_at: currentDate,
        updated_at: currentDate,
      })
      .returningAll()
      .execute();
    return data[0];
  }

  async update(item: {
    email?: string;
    name?: string;
    profileImage?: string;
    id: string;
  }): Promise<void> {
    await db
      .updateTable('user')
      .set({
        email: item.email,
        profile_url: item.profileImage,
        name: item.name,
        updated_at: new Date(),
      })
      .where('id', '=', item.id)
      .execute();
  }

  async find(id: string): Promise<User> {
    const data = await db
      .selectFrom('user')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst();

    if (!data) {
      throw new Error('User not found');
    }

    const user = User.create({
      id: data.id,
      email: data.email,
      name: data.name,
      password: data.password,
      dateOfBirth: data?.date_of_birth,
      profileUrl: data?.profile_url,
    });

    return user;
  }

  async findByName(name: string): Promise<User[]> {
    const result = await db
      .selectFrom('user')
      .selectAll()
      .where('name', '=', name)
      .execute();

    return result.map((data) =>
      User.create({
        id: data.id,
        email: data.email,
        name: data.name,
        password: data.password,
        dateOfBirth: data.date_of_birth,
      }),
    );
  }
}
