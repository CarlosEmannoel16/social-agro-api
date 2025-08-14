import { Note } from "@/domain/expenses/entity/Note";
import { RepositoryInterface } from "../../_shared/repository/RepositoryInsterface";
import { Animal } from "../entity/Animal";
import { GenderAnimal } from "@/infra/types/Animal";

export type addWeightParams = {
  idAnimal: string;
  weight: number;
  date: Date;
};

export type InputFindWithParamsRepository = {
  surname: string;
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
  acquisitionDate?: Date;
  images: string[]
};

export type UpdateAnimalRepositoryDTO = {
  surname?: string;
  gender?: GenderAnimal;
  userId: string;
  breed?: string;
  dateOfBirth?: Date;
  acquisitionDate?: Date;
  id: string
  image?:string
};

export interface AnimalRepositoryInterface {
  addImage(animalId: string, imageUrl: string, userId: string): Promise<void>;
  findWithParams(
    params: InputFindWithParamsRepository,
    userId: string
  ): Promise<Animal[] | undefined>;
  find(data: InputFindParamsRepository): Promise<Animal | undefined>;
  findByID(id: string, userId: string): Promise<Animal | undefined>;
  addWeight(data: addWeightParams): Promise<any>;
  addNote(data: Note, userId: string): Promise<Note>;
  deleteNote(
    animalId: string,
    noteId: string,
    userId: string
  ): Promise<any | undefined>;
  editNote(data: Note, userId: string): Promise<Note | undefined>;
  findByIds(ids: string[], userId: string): Promise<Animal[]>;
  createSon(data: Animal, userId: string): Promise<Animal>;
  findAll(userId: string): Promise<Animal[]>;
  create(input: CreateAnimalRepositoryDTO): Promise<void>;
  update(input: UpdateAnimalRepositoryDTO): Promise<void>
  delete(animalId: string): Promise<void>
  getInitialDashboardValues(userId: string): Promise<any>
  getLastWeekMilkProductionByDay(userId: string):Promise<any>
  getMilkProductionRanking(userId: string):Promise<any>
  getMilkProductionRankingByBreed(userId: string):Promise<any>
}
