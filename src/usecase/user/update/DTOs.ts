export interface InputUpdateUserDTO {
  id: string;
  name?: string;
  email?: string;
  profileImage?: string;
}

export interface OutputUpdateUserDTO {
  id: string;
  name: string;
  email: string;
}
