import {
  addDailyMilkProductionParams,
  MilkRepositoryInterface,
} from "@/domain/animal/repository/MilkProductionRepository";
import { DatabaseInitializer } from "@/loaders/database";
import { MilkProduction } from "@/domain/animal/valueObjects/MilkProduction";
import { MilkProductionEntity } from "@/infra/ORM/MilkProductionEntity";

export class MilkProductionRepository implements MilkRepositoryInterface {
  async create(item: MilkProduction): Promise<MilkProduction> {
    await DatabaseInitializer.db().getRepository(MilkProductionEntity).save({
      animalId: item.animalId,
      quantity: item.quantity,
      createdAt: new Date(),
    });

    return item;
  }
  update(item: MilkProduction): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findAll(userId: string): Promise<MilkProduction[]> {
    throw new Error("Method not implemented.");
  }

  async addDailyMilkProduction(data: addDailyMilkProductionParams) {
    const repository =
      DatabaseInitializer.db().getRepository(MilkProductionEntity);
    const result = await repository.save({
      animalId: data.idAnimal,
      quantity: data.dailyMilkProduction,
    });

    return result;
  }

  async findDailyMilkProduction(
    idAnimal: string
  ): Promise<MilkProduction[] | undefined> {
    const repository =
      DatabaseInitializer.db().getRepository(MilkProductionEntity);

    const result = await repository.find({
      where: {
        animalId: idAnimal,
      },
    });

    if (!result) return [];

    return result.map(
      (item) => new MilkProduction(item.createdAt, item.quantity, item.animalId)
    );
  }
}
