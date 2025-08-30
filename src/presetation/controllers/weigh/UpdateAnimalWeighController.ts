import { ControllerInterface } from "@/_shared/interfaces/ControllerInterface";
import { EditAnimalWeighUseCase } from "@/usecase/weigh/edit/EditAnimalWeighUseCase";
import { Request, Response, NextFunction } from "express";

export class UpdateAnimalWeighController implements ControllerInterface {
  constructor(private editAnimalWeighUseCase: EditAnimalWeighUseCase) {}

  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      const { animalId } = request.params;
      const data = request.body;

      await this.editAnimalWeighUseCase.execute(Number(animalId), data);
      return response.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
