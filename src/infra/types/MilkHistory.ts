import { MilkPriceTable } from "./MilkPrice";

export type MilkProductionHistoryTable = {
  id?: number;
  quantity: number;
  animal_id: string;
  price_milk_id: number
  date: Date;
  milk_price?: MilkPriceTable
  created_at?: Date;
  updated_at?: Date;
};
