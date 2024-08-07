import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { ControllerProtocol } from "../@shared/ControllerProtocol";
import { CreateAnimalUseCaseProtocol } from "../../../protocols/usecases/animal/CreateAnimalUseCaseProtocol";
import os from "os";
export class CreateAnimalController implements ControllerProtocol {
  constructor(
    private readonly createAnimalUseCase: CreateAnimalUseCaseProtocol
  ) {}

  async handle(
    request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    response: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const file = request?.file as Express.Multer.File;
      

      const image = `${file.filename}`;

      console.log(request.body);
      const result = await this.createAnimalUseCase.execute({
        breed: request.body.breed,
        dateOfBirth: request.body.dateOfBirth,
        fatherId: request.body.fatherId,
        images: [image],
        motherId: request.body.motherId,
        ownerId: request.body.ownerId,
        surname: request.body.surname,
        type: request.body.type,
        weight: request.body.weight,
      });

      return response.status(201).format({
        json: () => response.json(result),
      });
    } catch (error) {
      console.log(error);
      return response
        .status(500)
        .json({ error: "Erro ao tentar cadastrar animal" });
    }
  }
}
