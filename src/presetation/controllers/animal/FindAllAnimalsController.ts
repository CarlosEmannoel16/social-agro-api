import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { ControllerProtocol } from "../@shared/ControllerProtocol";
import { FindAllAnimalsUseCaseProtocol } from "../../../usecase/animal/findAll/FindAllAnimalsUseCaseProtocol";

export class FindAllAnimalsController implements ControllerProtocol {
  constructor(
    private readonly findAllAnimalsUseCase: FindAllAnimalsUseCaseProtocol
  ) {}
  async handle(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
     if(!request.params.idUser) throw new Error("Id do usuário não informado");
      const result = await this.findAllAnimalsUseCase.execute(request.params.idUser);
      return response.status(200).json(result);
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Erro ao tentar buscar todos os animal" });
    }
  } 
}
