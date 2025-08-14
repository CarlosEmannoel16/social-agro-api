import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import * as yup from "yup";
import { ValidationError } from "@/_shared/errors/Errors";
import { handlerErrorsController } from "@/presetation/helpers/handlerErrosController";
import { ControllerInterface } from "@/_shared/interfaces/ControllerInterface";
import { CreateAnimalUseCase } from "@/usecase/animal/create/CreateAnimalUseCase";
export class CreateAnimalController implements ControllerInterface {
  constructor(private readonly createAnimalUseCase: CreateAnimalUseCase) {}

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
          dateOfBirth: yup.date(),
          breed: yup?.string(),
          fatherId: yup.string(),
          motherId: yup.string(),
          ownerId: yup.string().required(),
          gender: yup.string().required(),
          weight: yup.string(),
        })
        .validateSync({
          ...request.body,
          ownerId: request.headers["userId"] as string,
        });

      const result = await this.createAnimalUseCase.execute({
        breed: request.body.breed,
        dateOfBirth: request.body.dateOfBirth,
        fatherId: request.body.fatherId,
        images: [image],
        motherId: request.body.motherId,
        ownerId: request.headers["userId"] as string,
        surname: request.body.surname,
        gender: request.body.gender,
        weight: request.body.weight,
      });

      return response.status(201).format({
        json: () => response.json(result),
      });
    } catch (error) {
      console.log(error);
      return response.status(500).json(handlerErrorsController(error as Error));
    }
  }
}
