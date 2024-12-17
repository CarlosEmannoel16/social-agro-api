import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { ControllerProtocol } from "../@shared/ControllerProtocol";
import * as yup from "yup";
import { ValidationError } from "@/_shared/errors/Errors";
import { handlerErrorsController } from "@/presetation/helpers/handlerErrosController";
import { CreateAnimalUseCaseProtocol } from "@/usecase/animal/create/CreateAnimalUseCaseProtocol";
export class CreateAnimalController implements ControllerProtocol {
  constructor(
    private readonly createAnimalUseCase: CreateAnimalUseCaseProtocol
  ) {}

  async handle(
    request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    response: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> {
    try {
      if (!Object.keys(request.body).length)
        throw new ValidationError("Body is empty");
      const file = request?.file as Express.Multer.File;

      const image = `${file?.filename}`;

      yup
        .object()
        .shape({
          surname: yup.string().required(),
          dateOfBirth: yup.date().required(),
          breed: yup?.string().required(),
          fatherId: yup.string(),
          motherId: yup.string(),
          ownerId: yup.string().required(),
          gender: yup.string().required(),
          weight: yup.number().required(),
        })
        .validateSync(request.body);

      const result = await this.createAnimalUseCase.execute({
        breed: request.body.breed,
        dateOfBirth: request.body.dateOfBirth,
        fatherId: request.body.fatherId,
        images: [image],
        motherId: request.body.motherId,
        ownerId: request.body.ownerId,
        surname: request.body.surname,
        gender: request.body.gender,
        weight: request.body.weight,
      });

      return response.status(201).format({
        json: () => response.json(result),
      });
    } catch (error) {
      return response.status(500).json(handlerErrorsController(error as Error));
    }
  }
}
