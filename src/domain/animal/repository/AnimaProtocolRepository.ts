import { RepositoryInterface } from "../../@shared/repository/RepositoryInsterface";
import { Animal } from "../entity/Animal";

export type addWeightParams = {
  idUser: string;
  idAnimal: string;
  weight: number;
  date: Date;
};

export type addDailyMilkProductionParams = {
  idUser: string;
  idAnimal: string;
  dailyMilkProduction: number;
  date: Date;
};
export interface AnimalRepositoryInterface extends RepositoryInterface<Animal> {
  addImage(animalId: string, imageUrl: string, userId: string): Promise<void>;
  findWithParams(params: string, userId: string): Promise<Animal[] | undefined>;
  find(id: string, animalId: string): Promise<Animal | undefined>;
  addWeight(data: addWeightParams): Promise<any>;
  addDailyMilkProduction(data: addDailyMilkProductionParams): Promise<any>;
}
