import { Request, Response } from "express";
import { ControllerProtocol } from "../@shared/ControllerProtocol";
import { SearchAnimalUseCaseProtocol } from "@/usecase/animal/search/SearchAnimelUseCaseProtocol";
export class SearchAnimalController implements ControllerProtocol {
  constructor(private searchAnimalUseCase: SearchAnimalUseCaseProtocol) {}
  async handle(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const result = await this.searchAnimalUseCase.execute({
        idUser: request.params.idUser,
        params: request.params.params,
      });


      return response.status(200).json(result);
    } catch (error) {
      return response.status(500).json({ error });
    }
  }
}
