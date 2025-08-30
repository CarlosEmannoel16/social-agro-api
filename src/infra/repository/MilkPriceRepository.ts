import { db } from "@/infra/kysely";

export class MilkPriceRepository {
  async findAll(userId: string) {
    const prices = await db
      .selectFrom("milk_price")
      .selectAll()
      .where("user_id", "=", userId)
      .orderBy("created_at", "desc")
      .execute();

    return prices;
  }

  async findLast(userId: string) {
    const prices = await db
      .selectFrom("milk_price")
      .selectAll()
      .where("user_id", "=", userId)
      .orderBy("created_at", "desc")
      .executeTakeFirst();

    return prices;
  }

  async create(price: number, userId: string) {
    const result = await db
      .insertInto("milk_price")
      .values({
        price,
        created_at: new Date(),
        update_at: new Date(),
        user_id: userId,
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    return result;
  }
}
