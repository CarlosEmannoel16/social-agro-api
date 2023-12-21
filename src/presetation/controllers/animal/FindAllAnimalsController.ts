import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { ControllerProtocol } from "../@shared/ControllerProtocol";
import { FindAllAnimalsUseCaseProtocol } from "../../../protocols/usecases/animal/FindAllAnimalsUseCaseProtocol";

export class FindAllAnimalsController implements ControllerProtocol {
  constructor(
    private readonly findAllAnimalsUseCase: FindAllAnimalsUseCaseProtocol
  ) {}
  async handle(
    request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    response: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> {
    try {
      console.log(request.params.idUser);
      const result = await this.findAllAnimalsUseCase.execute(request.params.idUser);
      return response.status(200).json(result);
    } catch (error) {
      console.log(error);
      return response
        .status(500)
        .json({ error: "Erro ao tentar buscar todos os animal" });
    }
  }
}
