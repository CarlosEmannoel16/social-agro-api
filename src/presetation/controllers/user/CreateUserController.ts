import { Request, Response } from "express";
import { ControllerProtocol } from "../@shared/ControllerProtocol";
import { CreateUserUseCaseProtocol } from "../../../protocols/usecases/user/CreateUserUseCaseProtocol";
import yup from "yup";
export class CreateUserController implements ControllerProtocol {
  constructor(private readonly createUserUseCase: CreateUserUseCaseProtocol) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      yup
        .object()
        .shape({
          email: yup.string().email().required(),
          password: yup.string().min(6).required(),
          passwordConfirmation: yup.string().min(6).required(),
          name: yup.string().required(),
        })
        .validateSync(request.body, { abortEarly: false });

      const result = await this.createUserUseCase.execute({
        email: request.body.email,
        password: request.body.password,
        passwordConfirmation: request.body.passwordConfirmation,
        name: request.body.name,
        imageUrl: request?.file?.path || "",
      });
      return response.status(201).json(result);
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: "Internal Error" });
    }
  }
}
