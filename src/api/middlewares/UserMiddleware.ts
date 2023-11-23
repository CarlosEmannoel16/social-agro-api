import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserRepositoryInterface } from "../../domain/user/repository/UserRepositoryInterface";
import { MiddlewareProtocol } from "../../presetation/controllers/@shared/MiddlewareProtocol";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
export class UserAuthMiddleware implements MiddlewareProtocol {
  constructor(private readonly userRepository: UserRepositoryInterface) {}
  

  async execute(req: Request, res: Response, next: NextFunction) {
    //Adicionar no env
    const privateKey = "eee88@09955%$#/";
    let user;
    const bearer = req.headers.authorization;

    const token = bearer?.split(" ")[1];

    if (!token) return res.status(401).json({ message: " not authorized" });

    jwt.verify(token, privateKey, async (err, result) => {
      if (err) return res.status(401).json({ message: " not authorized" });

      if (result instanceof Object && !result?.id)
        return res.status(401).json({ message: " not authorized" });

      if (result instanceof Object && result?.id) {
        user = await this.userRepository.find(result?.id);
        if (!user) return res.status(401).json({ message: " not authorized" });
        req.headers["userId"] = user.id;
        next();
      }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    next();
  }
}
