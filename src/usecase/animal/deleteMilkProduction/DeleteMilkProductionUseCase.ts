import { MilkRepositoryInterface } from '@/domain/animal/interfaces/MilkProductionRepository';

export class DeleteMilkProductionUseCase {
  constructor(
    private readonly milkProductionRepository: MilkRepositoryInterface,
  ) {}

  async handler(id: number) {
    await this.milkProductionRepository.deleteMilkProduction(id);
  }
}
