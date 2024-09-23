import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { ControllerProtocol } from "../@shared/ControllerProtocol";
import { FindUserUseCaseProtocol } from "../../../protocols/usecases/user/FindUserUseCaseProtocol";
import { Logger } from "@/infra/shared/logger/Logger";

export class FindUserController implements ControllerProtocol {
  constructor(private readonly findUserUseCase: FindUserUseCaseProtocol) {}
  async handle(
    request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    response: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const result = await this.findUserUseCase.execute({ id: request.params.id });
      return response.status(200).json(result);
    } catch (error) {
      Logger.error(error);
        return response.status(500).json({ message: 'Internal error' });
    }
  }
}
