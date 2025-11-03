import { ControllerInterface } from '@/_shared/interfaces/ControllerInterface';
import { InitialDashboardUseCase } from '@/usecase/dashboard/InitialDashboardUseCase';
import { Request, Response, NextFunction } from 'express';

export class InitialDashboardController implements ControllerInterface {
  constructor(
    private readonly initialDashboardUseCase: InitialDashboardUseCase,
  ) {}
  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    try {
      const data = await this.initialDashboardUseCase.execute(
        request.headers['userId'] as string,
      );

      return response.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}
