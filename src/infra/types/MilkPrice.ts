import { MilkProductionHistoryTable } from "./MilkHistory";

export type MilkPriceTable = {
  id?: number;
  price: number;
  user_id: string
  milk_history?: MilkProductionHistoryTable[]
  created_at?: Date;
  update_at?: Date;
};
