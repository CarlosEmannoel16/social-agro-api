import {
  addDailyMilkProductionParams,
  MilkRepositoryInterface,
} from "@/domain/animal/repository/MilkProductionRepository";
import { DatabaseInitializer } from "@database";
import { MilkProduction } from "@/domain/animal/valueObjects/MilkProduction";
import { MilkProductionEntity } from "@/infra/ORM/MilkProductionEntity";
import { Between } from "typeorm";

export class MilkProductionRepository implements MilkRepositoryInterface {
  async findDailyMilkProductionByDate(
    idAnimal: string,
    startDate: Date,
    endDate: Date
  ): Promise<MilkProduction[] | undefined> {
    const result = await DatabaseInitializer.db()
      .getRepository(MilkProductionEntity)
      .find({
        where: {
          animalId: idAnimal,
          createdAt: Between(startDate, endDate),
        },
      });

    return result.map(
      (item) => new MilkProduction(item.createdAt, item.quantity, item.animalId)
    );
  }

  async create(item: MilkProduction): Promise<MilkProduction> {
    await DatabaseInitializer.db().getRepository(MilkProductionEntity).save({
      animalId: item.animalId,
      quantity: item.quantity,
      createdAt: new Date(),
    });

    return item;
  }
  
  async update(item: MilkProduction): Promise<void> {
    await DatabaseInitializer.db().getRepository(MilkProductionEntity).update(
      {
        animalId: item.animalId,
      },
      {
        quantity: item.quantity,
        createdAt: item.date,
      }
    );
  }

  async findAll(userId: string): Promise<MilkProduction[]> {
    const repository =
      DatabaseInitializer.db().getRepository(MilkProductionEntity);
    const result = await repository.find({
      where: {
        animal: {
          userId,
        },
      },
    });

    return result.map(
      (item) => new MilkProduction(item.createdAt, item.quantity, item.animalId)
    );
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
