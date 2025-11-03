import { NextFunction, Request, Response } from 'express';
import { ControllerInterface } from '@/_shared/interfaces/ControllerInterface';
import { DeleteMilkProductionUseCase } from '@/usecase/animal/deleteMilkProduction/DeleteMilkProductionUseCase';

export class DeleteMilkProductionByIdController implements ControllerInterface {
  constructor(
    private readonly deleteMilkProductionUseCase: DeleteMilkProductionUseCase,
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

      await this.deleteMilkProductionUseCase.handler(Number(id));

      return response
        .status(200)
        .send({ message: 'Produção de leite deletada com sucesso' });
    } catch (error) {
      next(error);
    }
  }
}
