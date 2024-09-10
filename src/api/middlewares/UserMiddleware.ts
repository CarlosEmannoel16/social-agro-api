import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserRepositoryInterface } from "../../domain/user/repository/UserRepositoryInterface";
import { MiddlewareProtocol } from "../../presetation/controllers/@shared/MiddlewareProtocol";
export class UserAuthMiddleware implements MiddlewareProtocol {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async execute(req: Request, res: Response, next: NextFunction) {
    //Adicionar no env
    console.log("-- middleware --");
    const privateKey = "eee88@09955%$#/";
    let user;
    const bearer = req.headers.authorization;

    const token = bearer?.split(" ")[1];

    if (!token)
      return res
        .status(401)
        .json({ message: "not authorized. token not found" });

    jwt.verify(token, privateKey, async (err, result) => {
      if (err) return res.status(401).json({ message: "not authorized" });

      if (result instanceof Object && !result?.id)
        return res.status(401).json({ message: "not authorized" });

      if (result instanceof Object && result?.id) {
        user = await this.userRepository.find(result?.id);
        console.log(user);
        if (!user) return res.status(401).json({ message: "not authorized" });
        req.headers["userId"] = user.id;
        next();
      }
    });
  }
}
