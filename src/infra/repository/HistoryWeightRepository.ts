import { db } from "@/infra/kysely";

export class HistoryWeightRepository {
  async findByAnimalId(animalId: string): Promise<
    {
      id: number | undefined;
      animal_id: string;
      weight: number;
      date: Date;
      created_at: Date | undefined;
      updated_at: Date | undefined;
    }[]
  > {
    return db
      .selectFrom("weight_history")
      .selectAll()
      .where("animal_id", "=", animalId)
      .orderBy("date", "asc")
      .execute();
  }

  async findById(id: number): Promise<{
    id: number | undefined;
    animal_id: string;
    weight: number;
    date: Date;
    created_at: Date | undefined;
    updated_at: Date | undefined;
  } | null> {
    const result = await db
      .selectFrom("weight_history")
      .selectAll()
      .where("id", "=", id)
      .execute();

    return result[0] || null;
  }

  async create(data: any): Promise<void> {
    await db
      .insertInto("weight_history")
      .values({
        animal_id: data.animalId,
        date: data.date,
        weight: data.weight,
      })
      .execute();
  }

  async edit(
    id: number,
    data: {
      date: Date;
      weight: number;
    }
  ): Promise<void> {
    await db
      .updateTable("weight_history")
      .set({
        date: data.date,
        weight: data.weight,
      })
      .where("id", "=", id)
      .execute();
  }

  async delete(id: number): Promise<void> {
    await db.deleteFrom("weight_history").where("id", "=", id).execute();
  }
}
