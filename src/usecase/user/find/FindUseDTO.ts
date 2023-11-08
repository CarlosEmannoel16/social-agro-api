export interface InputFindUserDTO {
  id: string;
}

export interface OutputFindUserDTO {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  phones?: {
    number: string;
    dateOfCreation: Date;
    dateOfLastUpdated: Date;
  }[];
}
