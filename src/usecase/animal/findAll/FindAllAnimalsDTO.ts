export interface OutputFindAllAnimalDTO {
  id: string;
  name: string;
  age: string;
  breed: string;
  image: string[];
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
  weightHistory: {
    weight: number;
    dateOfRegister: string;
  };
}
[];
