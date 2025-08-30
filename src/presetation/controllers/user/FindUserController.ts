import { NextFunction, Request, Response } from 'express';
import { ControllerInterface } from '@/_shared/interfaces/ControllerInterface';
import FindUserUseCase from '@/usecase/user/find/FindUserUsecase';

export class FindUserController implements ControllerInterface {
  constructor(private readonly findUserUseCase: FindUserUseCase) {}
  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    try {
      const result = await this.findUserUseCase.execute({
        id: request.params.id,
      });
      return response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
