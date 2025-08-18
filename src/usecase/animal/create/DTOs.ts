import { GenderAnimal } from "@/infra/types/Animal";

export interface InputCreateAnimalDTO {
  surname: string;
  dateOfBirth?: Date;
  dateOfAcquisition?: Date;
  breed: string;
  gender: GenderAnimal;
  financiallyAcquired: boolean;
  acquisitionAmount?: number;
  fatherId?: string;
  motherId?: string;
  ownerId: string;
  images?: string[];
  weight: number
}
export interface OutputCreateAnimalDTO {
  id: string;
  surname: string;
  images: string[];
}
