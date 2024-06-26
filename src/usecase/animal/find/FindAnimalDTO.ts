export interface InputFindAnimalDTO {
  id: string;
  userId: string;
}

export interface OutputFindAnimalDTO  {
    id: string;
    name: string;
    age: string;
    type: string;
    breed: string;
    fatherId?: string;
    motherId?: string;
}
