import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { AddWeightAnimalUseCase } from "../../../usecase/animal/addWeight/AddWeigthUseCase";
import { handlerErrorsController } from "@/presetation/helpers/handlerErrosController";
import { ControllerInterface } from "@/_shared/interfaces/ControllerInterface";

export class AddWeightAnimalController implements ControllerInterface {
  constructor(
    private readonly addWeightAnimalUseCase: AddWeightAnimalUseCase
  ) {}
  async handle(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<Response> {
    try {
      await this.addWeightAnimalUseCase.execute(req.body);
      return res.status(200).json({
        message: "Peso adicionado com sucesso",
      });
    } catch (error) {
     
      return res.status(500).json(handlerErrorsController(error as Error));
    }
  }
}
