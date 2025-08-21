import { Note } from "@/domain/expenses/entity/Note";
import { GenderAnimal } from "@/infra/types/Animal";
import { Animal } from "../AnimalEntity";

export type addWeightParams = {
  idAnimal: string;
  weight: number;
  date: Date;
};

export type InputFindWithParamsRepository = {
  surname: string;
  fastId?: string;
};

export type InputFindParamsRepository = {
  userId: string;
  animalId: string;
};

export type CreateAnimalRepositoryDTO = {
  surname: string;
  gender: GenderAnimal;
  userId: string;
  weightHistory: {
    weight: number;
    date: Date;
  }[];
  breed?: string;
  dateOfBirth?: Date;
  dateOfAcquisition?: Date;
  images: string[];
  financiallyAcquired: boolean;
  fatherId?: string;
  motherId?: string;
  acquisitionAmount?: number;
};

export type UpdateAnimalRepositoryDTO = {
  surname?: string;
  gender?: GenderAnimal;
  userId: string;
  breed?: string;
  dateOfBirth?: Date;
  acquisitionDate?: Date;
  id: string;
  image?: string;
  dateOfAcquisition?: Date;
  images: string[];
  financiallyAcquired: boolean;
  fatherId?: string;
  motherId?: string;
  acquisitionAmount?: number;
};

export interface AnimalRepositoryInterface {
  addImage(animalId: string, imageUrl: string, userId: string): Promise<void>;
  findWithParams(
    params: InputFindWithParamsRepository,
    userId: string
  ): Promise<Animal[] | undefined>;
  find(data: InputFindParamsRepository): Promise<Animal | undefined>;
  findByID(id: string, userId: string): Promise<Animal | undefined>;
  findByIds(ids: string[], userId: string): Promise<Animal[]>;
  findAll(userId: string): Promise<Animal[]>;
  create(input: CreateAnimalRepositoryDTO): Promise<void>;
  update(input: UpdateAnimalRepositoryDTO): Promise<void>;
  delete(animalId: string): Promise<void>;
  getInitialDashboardValues(userId: string): Promise<any>;
  getLastWeekMilkProductionByDay(userId: string): Promise<any>;
  getMilkProductionRanking(userId: string): Promise<any>;
  getMilkProductionRankingByBreed(userId: string): Promise<any>;
}
