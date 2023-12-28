import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { ControllerProtocol } from "../@shared/ControllerProtocol";
import { AddWeightAnimalUseCase } from "../../../usecase/animal/addWeight/AddWeigthUseCase";

export class AddWeightAnimalController implements ControllerProtocol {
  constructor(
    private readonly addWeightAnimalUseCase: AddWeightAnimalUseCase
  ) {}
  async handle(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<Response> {
    try {

      await this.addWeightAnimalUseCase.execute(req.body.data);
      return res.status(200).json({
        message: "Peso adicionado com sucesso",
      });
    } catch (error) {
      return res.json({
        error: "Erro ao tentar adicionar peso ao animal",
      });
    }
  }
}
