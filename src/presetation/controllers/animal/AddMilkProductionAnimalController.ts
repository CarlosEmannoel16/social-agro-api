import { NextFunction, Request, Response } from "express";
import { AddMilkProductionUseCase } from "@/usecase/animal/addMilkProduction/AddMilkProductionUseCase";
import { ControllerInterface } from "@/_shared/interfaces/ControllerInterface";

export class AddMilkProductionAnimalController implements ControllerInterface {
  constructor(
    private readonly addMilkProductionUseCase: AddMilkProductionUseCase
  ) {}

  async handle(
    request: Request, 
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
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
      next(error);
    }
  }
}
