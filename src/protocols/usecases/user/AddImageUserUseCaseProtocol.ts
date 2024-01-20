import { UserRepositoryInterface } from "@/domain/user/repository/UserRepositoryInterface";

export interface AddImageUserUseCaseProtocol {
  
  handler(imageUrl: string, userId: string): Promise<void>;
}
