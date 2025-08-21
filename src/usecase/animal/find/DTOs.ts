import { GenderAnimal } from "@/infra/types/Animal";

export interface InputFindAnimalDTO {
  id: string;
  userId: string;
}

export interface OutputFindAnimalDTO {
    id: string;
    fastId: string;
    ownerId: string;
    name: string;
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
    milkProduction: any[];
    weight: {
        weight: number;
        dateOfRegister: string;
        createdAt: Date;
    }[];
    dateOfUpdate: Date;
    dateOfCreation: Date;
    averageProductionByMonth: number;
}