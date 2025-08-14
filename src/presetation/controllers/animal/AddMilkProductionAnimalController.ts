import { Request, Response } from "express";
import { AddMilkProductionUseCase } from "@/usecase/animal/addMilkProduction/AddMilkProductionUseCase";
import { handlerErrorsController } from "@/presetation/helpers/handlerErrosController";
import { ControllerInterface } from "@/_shared/interfaces/ControllerInterface";

export class AddMilkProductionAnimalController implements ControllerInterface {
  constructor(
    private readonly addMilkProductionUseCase: AddMilkProductionUseCase
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const userId = request.headers["userId"] as string;

      await this.addMilkProductionUseCase.handler({
        animalId: request.body.animalId,
        dateOfProduction: request.body.dateOfProduction,
        userId: userId,
        quantityOfMilk: request.body.quantityOfMilk,
        priceMilkId: request.body.priceMilkId,
      });

      return response.status(201).send();
    } catch (error) {
      console.log(error);
      return response.status(500).json(handlerErrorsController(error as Error));
    }
  }
}
