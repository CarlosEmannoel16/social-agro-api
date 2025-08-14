import { ControllerInterface } from "@/_shared/interfaces/ControllerInterface";
import { FindAllAnimalsUseCase } from "@/usecase/animal/findAll/FindAllAnimalsUseCase";
import { Request, Response } from "express";

export class FindAllAnimalsController implements ControllerInterface {
  constructor(private readonly findAllAnimalsUseCase: FindAllAnimalsUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      if (!request.headers["userId"])
        throw new Error("Id do usuário não informado");
      const result = await this.findAllAnimalsUseCase.execute(
        request.headers["userId"] as string
      );
      return response.status(200).json(result);
    } catch (error) {
      console.log(error);
      return response
        .status(500)
        .json({ error: "Erro ao tentar buscar todos os animal" });
    }
  }
}
