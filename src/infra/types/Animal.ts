import { AnimalImagesTable } from "./AnimalImages";
import { WeighingHistoryTable } from "./WeighingHistory";

export enum GenderAnimal {
  MALE = 'M',
  FEMALE = 'F',
}

export type AnimalTable = {
  id: string;
  fast_id?: string
  surname: string;
  gender: GenderAnimal;
  breed?: string | 'merge'
  date_of_birth?: Date;
  acquisition_date?: Date | null;
  financially_acquired?: Boolean
  acquisition_amount?: number
  created_at?: Date;
  updated_at?: Date;
  father_id?: string | null;
  mother_id?: string | null;
  user_id: string;
  last_production_date?: Date
};