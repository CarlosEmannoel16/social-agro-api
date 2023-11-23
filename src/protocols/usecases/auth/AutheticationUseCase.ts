import {
  InputAuthUseCase,
  OutputAuthUseCase,
} from "../../../usecase/auth/authDTO";

export interface AuthenticationUseCaseProtocol {
  execute(input: InputAuthUseCase): Promise<OutputAuthUseCase>;
}
