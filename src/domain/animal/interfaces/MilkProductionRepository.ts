import { MilkProduction } from "../valueObjects/MilkProduction";

export type addDailyMilkProductionParams = {
  idUser: string;
  idAnimal: string;
  dailyMilkProduction: number;
  date: Date;
  price_milk_id: number
};

export interface MilkRepositoryInterface {
  addDailyMilkProduction(data: addDailyMilkProductionParams): Promise<any>;
  findDailyMilkProduction(
    idAnimal: string
  ): Promise<MilkProduction[] | undefined>;
  findDailyMilkProductionByDate(
    idAnimal: string,
    startDate: Date,
    endDate: Date
  ): Promise<MilkProduction[] | undefined>;
}
