import { MilkPriceRepository } from "@/infra/repository/MilkPriceRepository";

export class FindLastMilkPriceUseCase {
  constructor(private readonly milkPriceRepository: MilkPriceRepository) {}

  async execute(userId: string) {
    const data = await this.milkPriceRepository.findLast(userId);
    if (!data) return;
    return {
      price: data.price / 100,
      date: data.update_at?.toLocaleDateString(),
      id: data.id
    };
  }
}
