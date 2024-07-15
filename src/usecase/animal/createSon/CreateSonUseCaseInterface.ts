export interface CreateSonUseCaseInterface {
  execute(data: InputCreateSonDTO): Promise<OutputCreateSonDTO>;
}

export interface InputCreateSonDTO {
  userId: string;
  fatherId: string;
  motherId: string;
  surname: string;
  dateOfBirth: Date;
  weight: number;
  images: string[];
}

export interface OutputCreateSonDTO {}
