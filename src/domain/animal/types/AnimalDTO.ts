import { GenderAnimal } from "@/infra/types/Animal";

export interface AnimalDTO {
  id: string;
  fastId: string;
  ownerId: string;
  name: string;
  yearOfLife: string;
  dateOfBirth: Date | undefined;
  gender: GenderAnimal;
  breed: string;
  fatherId: string | undefined;
  motherId: string | undefined;
  images: string[] | undefined;
  lastProductionDate: Date | undefined;
  dateOfAcquisition: Date | undefined;
  acquisitionAmount: number | undefined;
  financiallyAcquired: Boolean | undefined;
  historyMilkProduction: any[];
  weightHistory: {
    weight: number;
    dateOfRegister: string;
    createdAt: Date;
  }[];
  dateOfUpdate: Date;
  dateOfCreation: Date;
  averageProductionByMonth: number;
}
