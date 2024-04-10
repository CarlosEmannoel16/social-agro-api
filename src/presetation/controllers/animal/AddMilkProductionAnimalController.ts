import { Request, Response } from "express";
import { ControllerProtocol } from "../@shared/ControllerProtocol";
import { AddMilkProductionUseCase } from "@/usecase/animal/addMilkProduction/AddMilkProductionUseCase";

export class AddMilkProductionAnimalController implements ControllerProtocol {
  constructor(
    private readonly addMilkProductionUseCase: AddMilkProductionUseCase
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    await this.addMilkProductionUseCase.handler({
      animalId: request.body.animalId,
      dateOfProduction: request.body.dateOfProduction,
      ownerId: request.body.ownerId,
      quantityOfMilk: request.body.quantityOfMilk,
    });

    return response.status(201).send();
  }
}
