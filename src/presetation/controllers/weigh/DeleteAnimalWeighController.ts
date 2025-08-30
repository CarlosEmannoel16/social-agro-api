import { ControllerInterface } from "@/_shared/interfaces/ControllerInterface";
import { DeleteAnimalWeighUseCase } from "@/usecase/weigh/delete/DeleteAnimalWeighUseCase";
import { Request, Response, NextFunction } from "express";

export class DeleteAnimalWeighController implements ControllerInterface {
  constructor(private deleteAnimalWeighUseCase: DeleteAnimalWeighUseCase) {}

  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      const { animalId } = request.params;
      await this.deleteAnimalWeighUseCase.execute(Number(animalId));
      return response.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
