import { v4 } from "uuid";
import { Animal } from "../entity/Animal";
import { weightAnimal } from "../valueObjects/WeightAnimal";
import { MilkProduction } from "../valueObjects/MilkProduction";
import { GenderAnimal } from "@/infra/types/Animal";

interface InputCreateNewAnimalDTO {
  dateOfBirth?: Date;
  fatherId?: string;
  id?: string;
  surname?: string;
  ownerId?: string;
  gender: GenderAnimal;
  breed?: string;
  motherId?: string;
  images?: string[];
  lastProduction?: Date;
  fastId?: string 
  weightHistory?: {
    weight: number;
    dateOfRegister: Date;
  }[];
  milkProduction?: MilkProduction[];
}

export class AnimalFactory {
  static createNewAnimal({
    dateOfBirth,
    fatherId,
    surname,
    breed = "Generic",
    gender,
    motherId,
    images,
    weightHistory,
    id = v4(),
    ownerId,
    milkProduction,
    lastProduction,
    fastId
  }: InputCreateNewAnimalDTO) {
    const animal = new Animal(id, gender, breed, dateOfBirth, lastProduction);

    if (ownerId) animal.ownerId = ownerId;
    if(fastId) animal.fastId = fastId
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

    if (milkProduction) animal.addMilkProductions(milkProduction);

    return animal;
  }

  static createMap(data: InputCreateNewAnimalDTO[]): Animal[] {
    return data.map((item) => this.createNewAnimal(item));
  }
}
