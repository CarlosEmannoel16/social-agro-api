import { Note } from "@/domain/expenses/valueObjects/Note";
import { RepositoryInterface } from "../../_shared/repository/RepositoryInsterface";
import { Animal } from "../entity/Animal";

export type addWeightParams = {
  idAnimal: string;
  weight: number;
  date: Date;
};

export type InputFindWithParamsRepository = {
  id: string;
};

export interface AnimalRepositoryInterface extends RepositoryInterface<Animal> {
  addImage(animalId: string, imageUrl: string, userId: string): Promise<void>;
  findWithParams(
    params: InputFindWithParamsRepository,
    userId: string
  ): Promise<Animal[] | undefined>;
  find(animalId: string, userId: string): Promise<Animal | undefined>;
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
}
