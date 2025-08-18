import { ControllerInterface } from "@/_shared/interfaces/ControllerInterface";
import { UpdateAnimalUseCase } from "@/usecase/animal/updateAnimal/UpdateAnimalUseCase";
import { NextFunction, Request, Response } from "express";

export class UpdateAnimalController implements ControllerInterface {
  constructor(private readonly updateAnimalUseCase: UpdateAnimalUseCase) {}

  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      const file = request?.file as Express.Multer.File;

      const image = `${file?.filename}`;


      await this.updateAnimalUseCase.execute({ ...request.body, image });
      return response.status(200).json();
    } catch (error) {
      next(error);
    }
  }
}
