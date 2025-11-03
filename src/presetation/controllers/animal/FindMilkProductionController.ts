import { NextFunction, Request, Response } from 'express';
import { ControllerInterface } from '@/_shared/interfaces/ControllerInterface';
import { FindMilkProductionUseCase } from '@/usecase/animal/findMilkProduction/FindMilkProductionUseCase';

export class FindMilkProductionByIdController
  implements ControllerInterface
{
  constructor(
    private readonly findMilkProductionUseCase: FindMilkProductionUseCase,
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


      console.log('id ------->', id);
      const result = await this.findMilkProductionUseCase.handler(Number(id));
      console.log('result ------->', result);
      if (!result) {
        return response.status(404).send({ message: 'Produção de leite não encontrada' });
      }

      return response.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
