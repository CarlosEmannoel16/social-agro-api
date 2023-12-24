export interface OutputSearchAnimalUseCase {
    id: string;
    name: string;
    age: string;
    breed: string;
    image: string[];
    ownerId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface InputSearchAnimalUseCase {
  params: string;
  idUser: string;
}
