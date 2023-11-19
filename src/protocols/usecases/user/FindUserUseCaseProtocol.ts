import { InputFindUserDTO, OutputFindUserDTO } from "../../../usecase/user/find/FindUseDTO";

export interface FindUserUseCaseProtocol {
    execute(input: InputFindUserDTO): Promise<OutputFindUserDTO>;
}