import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { ControllerProtocol } from "../@shared/ControllerProtocol";
import { SearchAnimalUseCaseProtocol } from "../../../protocols/usecases/animal/SearchAnimelUseCaseProtocol";

export class SearchAnimalController implements ControllerProtocol {
  constructor(private searchAnimalUseCase: SearchAnimalUseCaseProtocol) {}
  async handle(
    request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    response: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> {
    try {
        console.log(request.params);
      const result = await this.searchAnimalUseCase.execute({
        idUser: request.params.idUser,
        params: request.params.params,
      });

      console.log(result);

      return response.status(200).json(result);
    } catch (error) {
      return response.status(500).json({ error });
    }
  }
}
