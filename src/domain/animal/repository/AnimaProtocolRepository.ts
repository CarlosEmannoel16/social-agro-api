import { Note } from "@/domain/expenses/valueObjects/Note";
import { RepositoryInterface } from "../../_shared/repository/RepositoryInsterface";
import { Animal } from "../entity/Animal";

export type addWeightParams = {
  idUser: string;
  idAnimal: string;
  weight: number;
  date: Date;
};

export interface AnimalRepositoryInterface extends RepositoryInterface<Animal> {
  addImage(animalId: string, imageUrl: string, userId: string): Promise<void>;
  findWithParams(params: string, userId: string): Promise<Animal[] | undefined>;
  find(animalId: string, userId: string): Promise<Animal | undefined>;
  addWeight(data: addWeightParams, userId: string): Promise<any>;
  addNote(data: Note, userId: string): Promise<Note>;
  deleteNote(animalId: string, noteId: string, userId: string): Promise<any | undefined>;
  editNote(data: Note, userId: string): Promise<Note | undefined>;
}
