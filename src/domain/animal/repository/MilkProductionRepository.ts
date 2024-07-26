import { RepositoryInterface } from "@/domain/_shared/repository/RepositoryInsterface";
import { MilkProduction } from "../valueObjects/MilkProduction";

export type addDailyMilkProductionParams = {
  idUser: string;
  idAnimal: string;
  dailyMilkProduction: number;
  date: Date;
};

export interface MilkRepositoryInterface
  extends RepositoryInterface<MilkProduction> {
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
