export enum GenderAnimal {
  MALE = 'M',
  FEMALE = 'F',
}

export interface UserTable {
  id: string;
  name: string;
  date_of_birth?: Date;
  email: string;
  password: string;
  profile_url?: string;
  updated_at: Date;
  created_at: Date;
}
