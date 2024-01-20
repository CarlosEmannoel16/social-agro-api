import { ServerError } from "@/_@shared/errors/Errors";
import { UserRepositoryInterface } from "@/domain/user/repository/UserRepositoryInterface";
import { AddImageUserUseCaseProtocol } from "@/protocols/usecases/user/AddImageUserUseCaseProtocol";

export class AddImageUserUseCase implements AddImageUserUseCaseProtocol {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async handler(imageUrl: string, userId: string): Promise<void> {
    const user = await this.userRepository.find(userId);
    if (!user) throw new ServerError("User not found");
    await this.userRepository.addImage(imageUrl, userId);
  }
}
