import { InputUpdateUserDTO, OutputUpdateUserDTO } from "./UpdateUserDTO";

export interface UpdateUserProtocolUseCase {
  execute(data: InputUpdateUserDTO): Promise<OutputUpdateUserDTO>;
}
