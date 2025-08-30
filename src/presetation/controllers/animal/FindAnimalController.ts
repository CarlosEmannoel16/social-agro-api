import { ControllerInterface } from '@/_shared/interfaces/ControllerInterface';
import { FindAnimalUseCase } from '@/usecase/animal/find/FindAnimalUseCase';
import { NextFunction, Request, Response } from 'express';

export class FindAnimalController implements ControllerInterface {
  constructor(private readonly findAnimalUseCaseCase: FindAnimalUseCase) {}
  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    try {
      if (!request.headers['userId']) throw new Error('idUser is required');
      if (!request.params.id) throw new Error('animal id is required');

      const animal = await this.findAnimalUseCaseCase.execute({
        id: request.params.id,
        userId: request.headers['userId'] as string,
      });
      return response.status(200).json(animal);
    } catch (error) {
      next(error);
    }
  }
}
