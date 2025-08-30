import {
  addDailyMilkProductionParams,
  MilkRepositoryInterface,
} from '@/domain/animal/interfaces/MilkProductionRepository';
import { MilkProduction } from '@/domain/animal/valueObjects/MilkProduction';
import { db } from '@/infra/kysely';

export class MilkProductionRepository implements MilkRepositoryInterface {
  async addDailyMilkProduction(
    data: addDailyMilkProductionParams,
  ): Promise<void> {
    await Promise.all([
      db
        .insertInto('milk_production')
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
        .where(`id`, `=`, data.idAnimal)
        .execute(),
    ]);
  }
  async findDailyMilkProduction(
    idAnimal: string,
  ): Promise<MilkProduction[] | undefined> {
    const result = await db
      .selectFrom('milk_production')
      .selectAll()
      .where('animal_id', '=', idAnimal)
      .execute();
    return result.map(
      (data) => new MilkProduction(data.date, data.quantity, data.animal_id, 1),
    );
  }
}
