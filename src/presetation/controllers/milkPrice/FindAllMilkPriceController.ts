import { ControllerInterface } from "@/_shared/interfaces/ControllerInterface";
import { FindMilkPriceUseCase } from "@/usecase/milkPrice/FindMilkPriceUseCase";
import { NextFunction, Request, Response } from "express";

export class FindAllMilkPriceController implements ControllerInterface {
  constructor(private readonly findAllMilkPriceUseCase: FindMilkPriceUseCase) {}
  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      const result = await this.findAllMilkPriceUseCase.execute(
        request.headers["userId"] as string
      );
      return response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
