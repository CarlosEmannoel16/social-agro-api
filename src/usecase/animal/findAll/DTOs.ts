export interface OutputFindAllAnimalDTO {
  id: string;
  name: string;
  age: string;
  breed: string;
  images: string[];
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
  fastId?: string
  weightHistory: {
    weight: number;
    dateOfRegister: string;
  }[];
  milkProduction: {
    dateOfRegister: string;
    quantity: number;
  }[];
  lastProductionDate?: Date
}

