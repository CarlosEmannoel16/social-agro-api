import { ControllerInterface } from "@/_shared/interfaces/ControllerInterface";
import { SearchAnimalUseCase } from "@/usecase/animal/search/SearchAnimalUseCase";
import { Request, Response } from "express";
export class SearchAnimalController implements ControllerInterface {
  constructor(private searchAnimalUseCase: SearchAnimalUseCase) {}
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
