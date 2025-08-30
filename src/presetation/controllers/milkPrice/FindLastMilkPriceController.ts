import { ControllerInterface } from "@/_shared/interfaces/ControllerInterface";
import { FindLastMilkPriceUseCase } from "@/usecase/milkPrice/FindCurrentMilkPriceUseCase";
import { NextFunction, Request, Response } from "express";

export class FindLastMilkPriceController implements ControllerInterface {
  constructor(
    private readonly findLastMilkPriceUseCase: FindLastMilkPriceUseCase
  ) {}
  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      const result = await this.findLastMilkPriceUseCase.execute(
        request.headers["userId"] as string
      );
      return response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
