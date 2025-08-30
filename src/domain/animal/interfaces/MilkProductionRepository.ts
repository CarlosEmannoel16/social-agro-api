import { MilkProduction } from '../valueObjects/MilkProduction';

export interface addDailyMilkProductionParams {
  idUser: string;
  idAnimal: string;
  dailyMilkProduction: number;
  date: Date;
  price_milk_id: number;
}

export interface MilkRepositoryInterface {
  addDailyMilkProduction(data: addDailyMilkProductionParams): Promise<void>;
  findDailyMilkProduction(
    idAnimal: string,
  ): Promise<MilkProduction[] | undefined>;
}
