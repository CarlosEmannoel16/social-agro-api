import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { MiddlewareInterface } from "@/_shared/interfaces/MiddlewareInterface";
import UserRepository from "@/infra/repository/UserRepository";

interface JwtPayload {
  id: string;
}

export class UserAuthMiddleware implements MiddlewareInterface {
  constructor(private readonly userRepository: UserRepository) {}

  public execute = async (req: Request, res: Response, next: NextFunction) => {
    const privateKey = "eee88@09955%$#/";
    if (!privateKey) {
      return res.status(401).json({ message: "JWT secret key not configured" });
    }

    const bearer = req.headers.authorization;
    if (!bearer) {
      console.log("Not authorized. Token not found");

      return res
        .status(401)
        .json({ message: "Not authorized. Token not found" });
    }

    const token = bearer.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Not authorized. Token is malformed" });
    }

    try {
      const decoded = jwt.verify(token, privateKey) as JwtPayload;
      const userRepository = new UserRepository();
      const user = await userRepository.find(decoded.id);
      if (!user) {
        return res
          .status(401)
          .json({ message: "Not authorized. User not found" });
      }

      req.headers["userId"] = user.id;
      next();
    } catch (err) {
      console.log('------',err);
      return res.status(401).json({ message: "Not authorized. Invalid token" });
    }
  };
}
