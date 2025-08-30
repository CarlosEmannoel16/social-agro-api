import { ControllerInterface } from "@/_shared/interfaces/ControllerInterface";
import { FindAllAnimalsUseCase } from "@/usecase/animal/findAll/FindAllAnimalsUseCase";
import { NextFunction, Request, Response } from "express";

export class FindAllAnimalsController implements ControllerInterface {
  constructor(private readonly findAllAnimalsUseCase: FindAllAnimalsUseCase) {}
  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      if (!request.headers["userId"])
        throw new Error("Id do usuário não informado");
      const result = await this.findAllAnimalsUseCase.execute(
        request.headers["userId"] as string
      );
      return response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
