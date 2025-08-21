import { User } from "../UserEntity";

export type InputCreateUserRepository = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
export interface UserRepositoryInterface {
  findByEmail(email: string): Promise<User | undefined>;
  find(id: string): Promise<User | undefined>;
  findByName(name: string): Promise<User[] | undefined>;
  addImage(imageUrl: string, userId: string): Promise<void>;
  checkIfExistsByEmail(email: string): Promise<boolean>;
  update(data: {
    email?: string;
    name?: string;
    profileImage?: string;
    id: string;
  }): Promise<void>;
  create(data: InputCreateUserRepository): Promise<{
    password: string;
    id: string;
    name: string;
    date_of_birth: Date | undefined;
    email: string;
    profile_url: string | undefined;
    updated_at: Date;
    created_at: Date;
  }>;
}
