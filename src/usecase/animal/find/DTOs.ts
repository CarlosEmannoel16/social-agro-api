export interface InputFindAnimalDTO {
  id: string;
  userId: string;
}

export interface OutputFindAnimalDTO {
  id: string;
  name: string;
  age: string;
  type: string;
  breed: string;
  fatherId?: string;
  motherId?: string;
  dateOfBirth?: Date;
  lasProductionDate?: Date;
  averageByMonth: number;
  images: string[] | [];
  gender: string
  weightHistory: {
    weight: number;
    dateOfRegister: string;
  }[];
  historyProduction: {
    dateOfRegister: string;
    quantity: number;
    amount: number;
  }[];
}
