import { GenderAnimal } from "@/infra/types/Animal";

export type inputUpdateAnimalDto = {
  surname?: string;
  gender?: GenderAnimal;
  userId?: string;
  breed?: string;
  dateOfBirth?: Date;
  acquisitionDate?: Date;
  id: string;
};
