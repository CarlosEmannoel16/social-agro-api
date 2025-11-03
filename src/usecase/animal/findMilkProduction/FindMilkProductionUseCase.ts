import { AnimalRepositoryInterface } from '@/domain/animal/interfaces/AnimaProtocolRepository';
import { MilkRepositoryInterface } from '@/domain/animal/interfaces/MilkProductionRepository';

export class FindMilkProductionUseCase {
  constructor(
    private readonly animalRepository: AnimalRepositoryInterface,
    private readonly milkProductionRepository: MilkRepositoryInterface,
  ) {}

  async handler(id: number) {
    return this.milkProductionRepository.findById(id);
  }
}
