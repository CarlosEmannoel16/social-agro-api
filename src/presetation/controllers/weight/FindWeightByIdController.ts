import { ControllerInterface } from "@/_shared/interfaces/ControllerInterface";
import { FindWeightByIdUseCase } from "@/usecase/weight/findById/FindWeightAnimalByIdUseCase";
import { Request, Response, NextFunction } from "express";

export class FindWeighByIdController implements ControllerInterface {
  constructor(private findWeightByIdUseCase: FindWeightByIdUseCase) {}
  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      const { id } = request.params;

      const result = await this.findWeightByIdUseCase.execute(Number(id));

      if (!result) {
        return response.status(404).json({ message: "Weight not found" });
      }

      return response.json(result);
    } catch (error) {
      next(error);
    }
  }
}
