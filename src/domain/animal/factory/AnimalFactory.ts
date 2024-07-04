import { v4 } from "uuid";
import { Animal, TypeAnimal } from "../entity/Animal";
import { weightAnimal } from "../entity/WeightAnimal";

interface InputCreateNewAnimalDTO {
  dateOfBirth: Date;
  fatherId?: string;
  id?: string;
  surname?: string;
  type: TypeAnimal;
  breed?: string;
  motherId?: string;
  images?: string[];
  weightHistory?: {
    weight: number;
    dateOfRegister: Date;
  }[];
}

export class AnimalFactory {
  static createNewAnimal({
    dateOfBirth,
    fatherId,
    surname,
    breed = "Generic",
    type,
    motherId,
    images,
    weightHistory,
    id = v4(),
  }: InputCreateNewAnimalDTO) {
    const animal = new Animal(id, dateOfBirth, type, breed);

    if (surname) animal.surname = surname;
    if (fatherId) animal.idFather = fatherId;
    if (motherId) animal.IdMother = motherId;
    if (breed) animal.breed = breed;
    if (images) animal.addImageUrl(images);
    if (weightHistory?.length) {
      weightHistory.forEach((weightHistory) => {
        const w = new weightAnimal(
          weightHistory.weight,
          weightHistory.dateOfRegister
        );
        animal.addWeight(w);
      });
    }

    return animal;
  }

  static createMap(data: InputCreateNewAnimalDTO[]): Animal[] {
    return data.map((item) => this.createNewAnimal(item));
  }
}
