import {
  addDailyMilkProductionParams,
  MilkRepositoryInterface,
} from "@/domain/animal/repository/MilkProductionRepository";
import { MilkProduction } from "@/domain/animal/valueObjects/MilkProduction";
import { db } from "@/infra/kysely";

export class MilkProductionRepository implements MilkRepositoryInterface {
  addDailyMilkProduction(data: addDailyMilkProductionParams): Promise<any> {
    return Promise.all([
      db
        .insertInto("milk_production")
        .values({
          animal_id: data.idAnimal,
          date: data.date,
          quantity: data.dailyMilkProduction,
          price_milk_id: data.price_milk_id,
        })
        .execute(),
      db
        .updateTable(`animal`)
        .set(`last_production_date`, data.date)
        .where(`id`, `=`, data.idAnimal).execute()
    ]);
  }
  async findDailyMilkProduction(
    idAnimal: string
  ): Promise<MilkProduction[] | undefined> {
    const result = await db.selectFrom("milk_production").selectAll().execute();
    return result.map(
      (data) => new MilkProduction(data.date, data.quantity, data.animal_id, 1)
    );
  }
  findDailyMilkProductionByDate(
    idAnimal: string,
    startDate: Date,
    endDate: Date
  ): Promise<MilkProduction[] | undefined> {
    throw new Error("Method not implemented.");
  }
}
