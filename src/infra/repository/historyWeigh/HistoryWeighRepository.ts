import { db } from "@/infra/kysely";

export class HistoryWeighRepository {
  async findByAnimalId(animalId: string): Promise<any[]> {
    return db
      .selectFrom("weight_history")
      .where("animal_id", "=", animalId)
      .orderBy("date", "asc")
      .execute();
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
}
