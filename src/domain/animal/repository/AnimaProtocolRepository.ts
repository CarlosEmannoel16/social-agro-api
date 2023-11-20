import { RepositoryInterface } from "../../@shared/repository/RepositoryInsterface";
import { Animal } from "../entity/Animal";

export interface AnimalRepositoryInterface extends RepositoryInterface<Animal> {}