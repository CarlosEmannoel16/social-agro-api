export interface InputCreateAnimalDTO {
  surname: string;
  isPublic: boolean;
  type: string;
  weight: number;
  age: number;
  dateOfBirth: Date;
  motherId: string;
  image: string;
  ownerId: string;
}
export interface OutputCreateAnimalDTO {
  id: string;
  surname: string;
  isPublic: boolean;
  image: string;
}
