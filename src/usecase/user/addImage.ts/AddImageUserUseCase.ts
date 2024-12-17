import { UserRepositoryInterface } from "@/domain/user/repository/UserRepositoryInterface";

export class AddImageUserUseCase {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async handler(imageUrl: string, userId: string): Promise<void> {
    const user = await this.userRepository.find(userId);
    if (!user) throw new Error("User not found");
    await this.userRepository.addImage(imageUrl, userId);
  }
}
