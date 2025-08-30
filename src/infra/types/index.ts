import { AnimalTable } from "./Animal";
import { AnimalImagesTable } from "./AnimalImages";
import { BreedAnimal } from "./BreedAnimal";
import { MilkProductionHistoryTable } from "./MilkHistory";
import { MilkPriceTable } from "./MilkPrice";
import { UserTable } from "./User";
import { WeighingHistoryTable } from "./WeighingHistory";

export interface Database {
  animal: AnimalTable;
  weight_history: WeighingHistoryTable;
  animal_images: AnimalImagesTable;
  milk_price: MilkPriceTable;
  user: UserTable;
  milk_production: MilkProductionHistoryTable;
  breed_animal: BreedAnimal
}
