export interface CreateSonUseCaseInterface {
  execute(data: InputCreateSonDTO): Promise<OutputCreateSonDTO>;
}


export interface InputCreateSonDTO {}

export interface OutputCreateSonDTO {}