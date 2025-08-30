import { GenderAnimal } from '@/infra/types/Animal';
import { Animal } from '../AnimalEntity';

export interface addWeightParams {
  idAnimal: string;
  weight: number;
  date: Date;
}

export interface InputFindWithParamsRepository {
  surname: string;
  fastId?: string;
}

export interface InputFindParamsRepository {
  animalId: string;
}

export interface CreateAnimalRepositoryDTO {
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
}

export interface UpdateAnimalRepositoryDTO {
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
}

export interface GetInitialDashboardValuesOutput {
  totalLiters: number;
  totalValueReais: number;
}

export interface GetMilkProductionRankingOutput {
  id: string;
  surname: string;
  totalProduction: number;
}

export interface GetMilkProductionRankingByBreedOutput {
  breed: string | undefined;
  totalProduction: number;
}

export interface GetLastWeekMilkProductionByDayOutput {
  dayName: string;
  dayNumber: number;
  date: string;
  totalLiters: number;
  totalValueReais: number;
}

export interface AnimalRepositoryInterface {
  addImage(animalId: string, imageUrl: string, userId: string): Promise<void>;
  findWithParams(
    params: InputFindWithParamsRepository,
    userId: string,
  ): Promise<Animal[] | undefined>;
  find(animalId: string): Promise<Animal | undefined>;
  findByID(id: string, userId: string): Promise<Animal | undefined>;
  findByIds(ids: string[], userId: string): Promise<Animal[]>;
  findAll(userId: string): Promise<Animal[]>;
  create(input: CreateAnimalRepositoryDTO): Promise<void>;
  update(input: UpdateAnimalRepositoryDTO): Promise<void>;
  delete(animalId: string): Promise<void>;
  getInitialDashboardValues(
    userId: string,
  ): Promise<GetInitialDashboardValuesOutput>;
  getLastWeekMilkProductionByDay(userId: string): Promise<GetLastWeekMilkProductionByDayOutput[]>;
  getMilkProductionRanking(
    userId: string,
  ): Promise<GetMilkProductionRankingOutput[]>;
  getMilkProductionRankingByBreed(
    userId: string,
  ): Promise<GetMilkProductionRankingByBreedOutput[]>;
}
