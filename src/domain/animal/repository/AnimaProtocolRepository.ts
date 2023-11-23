import { RepositoryInterface } from "../../@shared/repository/RepositoryInsterface";
import { Animal } from "../entity/Animal";

export interface AnimalRepositoryInterface extends RepositoryInterface<Animal> {
  addImage(animalId: string, imageUrl: string): Promise<void>;
  findAnimalFromUser(userId: string, animalId: string): Promise<Animal | undefined>;
}
