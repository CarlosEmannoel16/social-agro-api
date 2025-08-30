import { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import { ValidationError } from "@/_shared/errors/Errors";
import { ControllerInterface } from "@/_shared/interfaces/ControllerInterface";
import { CreateAnimalUseCase } from "@/usecase/animal/create/CreateAnimalUseCase";
export class CreateAnimalController implements ControllerInterface {
  constructor(private readonly createAnimalUseCase: CreateAnimalUseCase) {}

  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
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
        motherId: request.body.motherId,
        images: [image],
        ownerId: request.headers["userId"] as string,
        surname: request.body.surname,
        gender: request.body.gender,
        weight: request.body.weight,
        financiallyAcquired: request.body?.financiallyAcquired,
        acquisitionAmount: request.body?.acquisitionAmount,
        dateOfAcquisition: request.body?.dateOfAcquisition,
      });

      return response.status(201).format({
        json: () => response.json(result),
      });
    } catch (error) {
      next(error);
    }
  }
}
