import { ControllerInterface } from "@/_shared/interfaces/ControllerInterface";
import { AddWeightAnimalUseCase } from "@/usecase/weight/addWeight/AddWeightUseCase";
import { Request, Response, NextFunction } from "express";

export class AddWeighAnimalController implements ControllerInterface {
  constructor(private addWeighAnimalUseCase: AddWeightAnimalUseCase) {}
  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      const { animalId, date, weight } = request.body;
      await this.addWeighAnimalUseCase.execute({ animalId, date, weight });
      return response.status(201).send();
    } catch (error) {
      console.error("Error adding weight:", error);
      return response.status(500).send();
    }
  }
}
