import { MilkPriceRepository } from "@/infra/repository/milkPrice/MilkPriceRepository";

export class CreateMilkPriceUseCase {
  constructor(private readonly milkPriceRepository: MilkPriceRepository) {}

  execute(price: number, userId: string) {
    return this.milkPriceRepository.create(price, userId);
  }
}
