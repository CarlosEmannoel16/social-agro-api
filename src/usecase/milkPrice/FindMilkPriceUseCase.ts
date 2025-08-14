import { MilkPriceRepository } from "@/infra/repository/milkPrice/MilkPriceRepository";

export class FindMilkPriceUseCase {
  constructor(private readonly milkPriceRepository: MilkPriceRepository) {}

  async execute(userId: string) {
    const result = await this.milkPriceRepository.findAll(userId);
    return result.map(data=>{
      return {
        price: `R$ ${(data.price/100).toFixed(2)}`,
        date: data.update_at?.toLocaleDateString()
      }
    })
  }
}
