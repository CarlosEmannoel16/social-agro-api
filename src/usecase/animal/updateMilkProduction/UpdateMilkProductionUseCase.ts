import { AnimalRepositoryInterface } from '@/domain/animal/interfaces/AnimaProtocolRepository';
import { InputUpdateMilkProductionDTO } from './DTOs';
import { MilkRepositoryInterface } from '@/domain/animal/interfaces/MilkProductionRepository';
import { ValidationError } from '@/_shared/errors/Errors';

export class UpdateMilkProductionUseCase {
  constructor(
    private readonly animalRepository: AnimalRepositoryInterface,
    private readonly milkProductionRepository: MilkRepositoryInterface,
  ) {}

  async handler(data: InputUpdateMilkProductionDTO) {
    if (data.dateOfProduction > new Date())
      throw new ValidationError(
        'Data da produção deve ser igual ou anterior a data atual',
      );

    await this.milkProductionRepository.updateMilkProduction({
      dailyMilkProduction: data.quantityOfMilk,
      date: data.dateOfProduction,
      id: data.id,
    });
  }
}
