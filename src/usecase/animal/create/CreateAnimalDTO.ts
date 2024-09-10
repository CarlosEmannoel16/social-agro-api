import { GenderAnimal } from "../../../domain/animal/entity/Animal";

export interface InputCreateAnimalDTO {
  surname: string;
  gender: GenderAnimal;
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
  images: string[];
}
