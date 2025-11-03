import { NextFunction, Request, Response } from 'express';
import { ControllerInterface } from '@/_shared/interfaces/ControllerInterface';
import { UpdateMilkProductionUseCase } from '@/usecase/animal/updateMilkProduction/UpdateMilkProductionUseCase';

export class UpdateMilkProductionAnimalController
  implements ControllerInterface
{
  constructor(
    private readonly updateMilkProductionUseCase: UpdateMilkProductionUseCase,
  ) {}

  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    try {
      const id = request.params.id;

      if (!id) {
        throw new Error('ID da produção de leite é obrigatório');
      }

      await this.updateMilkProductionUseCase.handler({
        id: Number(id),
        quantityOfMilk: request.body.quantityOfMilk,
        dateOfProduction: new Date(request.body.dateOfProduction),
      });

      return response.status(201).send();
    } catch (error) {
      next(error);
    }
  }
}
