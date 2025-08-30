import { MilkPriceRepository } from "@/infra/repository/MilkPriceRepository";

export class CreateMilkPriceUseCase {
  constructor(private readonly milkPriceRepository: MilkPriceRepository) {}

  execute(price: number, userId: string) {
    return this.milkPriceRepository.create(price, userId);
  }
}
