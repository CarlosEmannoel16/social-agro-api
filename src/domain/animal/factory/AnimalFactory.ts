import { v4 } from "uuid";
import { Animal, TypeAnimal } from "../entity/Animal";

interface InputCreateNewAnimalDTO {
  dateOfBirth: Date;
  fatherId?: string;
  surname?: string;
  type: TypeAnimal;
  breed?: string;
  ownerId: string;
  motherId?: string;
  images?: string[]
}

export class AnimalFactory {
  static createNewAnimal({
    dateOfBirth,
    fatherId,
    surname,
    breed = "Generic",
    ownerId,
    type,
    motherId,
    images
  }: InputCreateNewAnimalDTO) {
    const id = v4();
    const animal = new Animal(id, dateOfBirth, type, breed, ownerId);

    if (surname) animal.surname = surname;
    if (fatherId) animal.idFather = fatherId;
    if (motherId) animal.IdMother = motherId;
    if (breed) animal.breed = breed;
    if(images) animal.addImageUrl(images)

    return animal;
  }
}
