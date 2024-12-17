import {
  InputCreateUserDTO,
  OutputCreateUserDTO,
} from "../../../usecase/user/create/CreateUserDTO";

export interface CreateUserUseCaseProtocol {
  execute(data: InputCreateUserDTO): Promise<OutputCreateUserDTO>;
}
