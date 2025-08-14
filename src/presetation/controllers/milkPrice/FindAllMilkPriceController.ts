import { ControllerInterface } from "@/_shared/interfaces/ControllerInterface";
import { CreateMilkPriceUseCase } from "@/usecase/milkPrice/CreateMilkPriceUseCase";
import { FindMilkPriceUseCase } from "@/usecase/milkPrice/FindMilkPriceUseCase";
import { Request, Response } from "express";

export class FindAllMilkPriceController implements ControllerInterface {
  constructor(private readonly findAllMilkPriceUseCase: FindMilkPriceUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const result = await this.findAllMilkPriceUseCase.execute(
        request.headers["userId"] as string
      );
      return response.status(200).json(result);
    } catch (error) {
      console.log(error);
      return response.status(500).json({});
    }
  }
}
