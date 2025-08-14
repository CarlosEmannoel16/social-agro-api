import { ControllerInterface } from "@/_shared/interfaces/ControllerInterface";
import { FindAnimalUseCase } from "@/usecase/animal/find/FindAnimalUseCase";
import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

export class FindAnimalController implements ControllerInterface {
  constructor(private readonly findAnimalUseCaseCase: FindAnimalUseCase) {}
  async handle(
    request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    response: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> {
    try {
      if (!request.headers["userId"]) throw new Error("idUser is required");
      if (!request.params.id) throw new Error("animal id is required");

      const animal = await this.findAnimalUseCaseCase.execute({
        id: request.params.id,
        userId: request.headers["userId"] as string
      });
      return response.status(200).json(animal);
    } catch (error) {
      console.log(error);
      return response.status(500).json({ error });
    }
  }
}
