import { ControllerInterface } from "@/_shared/interfaces/ControllerInterface";
import { CreateMilkPriceUseCase } from "@/usecase/milkPrice/CreateMilkPriceUseCase";
import { Request, Response } from "express";

export class CreateMilkPriceController implements ControllerInterface {
  constructor(
    private readonly createMilkPriceUseCase: CreateMilkPriceUseCase
  ) {}
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      await this.createMilkPriceUseCase.execute(
        request.body.price,
        request.headers["userId"] as string
      );
      return response.status(201).json({
        status: "CREATED",
      });
    } catch (error) {
      return response.status(500).json({});
    }
  }
}
