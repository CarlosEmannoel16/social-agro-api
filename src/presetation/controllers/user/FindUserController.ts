import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { FindUserUseCaseProtocol } from "@/usecase/user/find/FindUserUseCaseProtocol";
import { ControllerInterface } from "@/_shared/interfaces/ControllerInterface";

export class FindUserController implements ControllerInterface {
  constructor(private readonly findUserUseCase: FindUserUseCaseProtocol) {}
  async handle(
    request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    response: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const result = await this.findUserUseCase.execute({
        id: request.params.id,
      });
      return response.status(200).json(result);
    } catch (error) {
      return response.status(500).json({ message: "Internal error" });
    }
  }
}
