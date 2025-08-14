import { ControllerInterface } from "@/_shared/interfaces/ControllerInterface";
import { DeleteAnimalUseCase } from "@/usecase/animal/delete/DeleteAnimalUseCase";
import { UpdateAnimalUseCase } from "@/usecase/animal/updateAnimal/UpdateAnimalUseCase";
import { NextFunction, Request, Response } from "express";

export class DeleteAnimalController implements ControllerInterface {
  constructor(private readonly deleteAnimalUseCase: DeleteAnimalUseCase) {}

  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      const userId = request.headers["userId"] as string
      const id = request.params.id;

      await this.deleteAnimalUseCase.handle({
        id,
        userId
      });
      return response.status(200).json();
    } catch (error) {
      next(error);
    }
  }
}
