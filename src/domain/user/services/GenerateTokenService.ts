import jwt from "jsonwebtoken";

export interface IGenerateTokenService {
  execute(data: GenerateTokenServiceDTO): string;
}

export interface GenerateTokenServiceDTO  {
  id: string;
};

export class GenerateTokenService implements IGenerateTokenService {
  execute(data: GenerateTokenServiceDTO): string {
    const privateKey = "eee88@09955%$#/";

    const token = jwt.sign(
      {
        id: data.id,
      },
      privateKey,
      { expiresIn: "48h", algorithm: "HS256" }
    );

    return token;
  }
}
