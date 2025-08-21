import { UserRepositoryInterface } from "@/domain/user/interfaces/UserRepositoryInterface";

export class AddImageUserUseCase {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async handler(imageUrl: string, userId: string): Promise<void> {
    const user = await this.userRepository.find(userId);
    if (!user) throw new Error("User not found");
    await this.userRepository.addImage(imageUrl, userId);
  }
}
