import { RepositoryInterface } from "../../@shared/repository/RepositoryInsterface";
import { Animal } from "../entity/Animal";

export interface AnimalRepositoryInterface extends RepositoryInterface<Animal> {
  addImage(animalId: string, imageUrl: string, userId: string): Promise<void>;
  findWithParams(params: string, userId: string): Promise<Animal[] | undefined>;
  find(id: string, animalId: string): Promise<Animal | undefined>;
}
