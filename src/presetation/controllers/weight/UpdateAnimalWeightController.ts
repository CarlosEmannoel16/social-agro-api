import { ControllerInterface } from "@/_shared/interfaces/ControllerInterface";
import { EditAnimalWeightUseCase } from "@/usecase/weight/edit/EditAnimalWeightUseCase";
import { Request, Response, NextFunction } from "express";

export class UpdateAnimalWeightController implements ControllerInterface {
  constructor(private editAnimalWeightUseCase: EditAnimalWeightUseCase) {}

  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      const { animalId } = request.params;
      const data = request.body;

      await this.editAnimalWeightUseCase.execute(Number(animalId), data);
      return response.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
