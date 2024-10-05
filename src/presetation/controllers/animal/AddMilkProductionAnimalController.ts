import { Request, Response } from "express";
import { ControllerProtocol } from "../@shared/ControllerProtocol";
import { AddMilkProductionUseCase } from "@/usecase/animal/addMilkProduction/AddMilkProductionUseCase";
import { Logger } from "@Logger";
import { handlerErrorsController } from "@/presetation/helpers/handlerErrosController";

export class AddMilkProductionAnimalController implements ControllerProtocol {
  constructor(
    private readonly addMilkProductionUseCase: AddMilkProductionUseCase
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {

    try {
      await this.addMilkProductionUseCase.handler({
        animalId: request.body.animalId,
        dateOfProduction: request.body.dateOfProduction,
        userId: request.body.userId,
        quantityOfMilk: request.body.quantityOfMilk,
      });
  
      return response.status(201).send();
    } catch (error) {
      Logger.error(error);
      return response.status(500).json(handlerErrorsController(error as Error));
    }
    
  }
}
