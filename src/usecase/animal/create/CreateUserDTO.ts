import { Type } from "typescript";
import { TypeAnimal } from "../../../domain/animal/entity/Animal";

export interface InputCreateAnimalDTO {
  surname: string;
  isPublic: boolean;
  type: TypeAnimal;
  weight: number;
  age: number;
  dateOfBirth: Date;
  motherId: string;
  image: string;
  ownerId: string;
  fatherId: string;
  breed: string;
}
export interface OutputCreateAnimalDTO {
  id: string;
  surname: string;
  isPublic: boolean;
  image: string;
}
