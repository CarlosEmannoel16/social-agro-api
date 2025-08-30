import { NextFunction, Request, Response } from "express";
import { ValidationError } from "@/_shared/errors/Errors";
import { ControllerInterface } from "@/_shared/interfaces/ControllerInterface";
import { UpdateUserUseCase } from "@/usecase/user/update/UpdateUseCase";
export class UpdateUserController implements ControllerInterface {
  constructor(private readonly updateUserUseCase: UpdateUserUseCase) {}

  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      if (!Object.keys(request?.body).length)
        throw new ValidationError("Body is required");

      const result = await this.updateUserUseCase.execute({
        email: request.body.email,
        name: request.body.name,
        profileImage: request?.file?.filename || "",
        id: request.headers["userId"] as string,
      });
      return response.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
}
