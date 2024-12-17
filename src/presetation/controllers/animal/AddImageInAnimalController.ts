import { ControllerInterface } from "@/_shared/interfaces/ControllerInterface";
import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

export class AddImageInAnimalController implements ControllerInterface {
  async handle(
    request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    response: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> {
    try {
      throw new Error("Method not implemented.");
    } catch (error) {
      return response.status(500).json({ error: "Internal error" });
    }
  }
}
