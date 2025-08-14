import { ControllerInterface } from "@/_shared/interfaces/ControllerInterface";
import { FindLastMilkPriceUseCase } from "@/usecase/milkPrice/FindCurrentMilkPriceUseCase";
import { Request, Response } from "express";

export class FindLastMilkPriceController implements ControllerInterface {
  constructor(
    private readonly findLastMilkPriceUseCase: FindLastMilkPriceUseCase
  ) {}
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const result = await this.findLastMilkPriceUseCase.execute(
        request.headers["userId"] as string
      );
      return response.status(200).json(result);
    } catch (error) {
      console.log(error);
      return response.status(500).json({});
    }
  }
}
