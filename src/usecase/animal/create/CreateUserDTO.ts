import { Type } from "typescript";
import { TypeAnimal } from "../../../domain/animal/entity/Animal";

export interface InputCreateAnimalDTO {
  surname: string;
  isPublic: boolean;
  type: TypeAnimal;
  weight: number;
  dateOfBirth: Date;
  motherId: string;
  images: string[];
  ownerId: string;
  fatherId: string;
  breed: string;
}
export interface OutputCreateAnimalDTO {
  id: string;
  surname: string;
  isPublic: boolean;
  images: string[];
}
