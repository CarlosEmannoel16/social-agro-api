import { addDailyMilkProductionParams, MilkRepositoryInterface } from "@/domain/animal/repository/MilkProductionRepository";
import { dataBase } from "../shared/db/prisma/config/prismaClient";
import { MilkProduction } from "@/domain/animal/valueObjects/MilkProduction";

export class MilkProductionRepository implements MilkRepositoryInterface {

  async addDailyMilkProduction(data: addDailyMilkProductionParams) {
    const result = await dataBase.dailyAmountOfMilk.create({
      data: {
        amount: data.dailyMilkProduction,
        date: data.date,
        animalsId: data.idAnimal,
      },
    });

    return result;
  }

 

  async findDailyMilkProduction(idAnimal: string) :Promise<MilkProduction[] | undefined> {
    const result = await dataBase.dailyAmountOfMilk.findMany({
      where: {
        animalsId: idAnimal,
      },
    });

    return result.map((item) => {
        item.date
        return new MilkProduction()
    } )
  }

}