import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';
import { ValidationError } from '@/_shared/errors/Errors';
import { ControllerInterface } from '@/_shared/interfaces/ControllerInterface';
import { AuthUseCase } from '@/usecase/auth/auth';
export class AuthenticationController implements ControllerInterface {
  constructor(private readonly authenticationUseCase: AuthUseCase) {}
  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    try {
      if (!Object.keys(request?.body).length)
        throw new ValidationError('Body is required');
      yup
        .object()
        .shape({
          email: yup.string().email().required(),
          password: yup.string().min(6).required(),
        })
        .validateSync(request.body, { abortEarly: false });

      const { email, password } = request.body;

      const result = await this.authenticationUseCase.execute({
        email,
        password,
      });
      return response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
