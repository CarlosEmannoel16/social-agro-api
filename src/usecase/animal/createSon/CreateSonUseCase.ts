import {
  CreateSonUseCaseInterface,
  InputCreateSonDTO,
  OutputCreateSonDTO,
} from "./CreateSonUseCaseInterface";

export class CreateSonUseCase implements CreateSonUseCaseInterface {
  constructor() {}
  async execute(data: InputCreateSonDTO): Promise<OutputCreateSonDTO> {
    throw new Error("Method not implemented.");
  }
}
