import UserRepository from "@/infra/repository/user/UserRepository";
import { UserAuthMiddleware } from "../../api/middlewares/UserMiddleware";
import { MiddlewareProtocol } from "../controllers/@shared/MiddlewareProtocol";

export const makeMiddlewareAuth = (): MiddlewareProtocol => {
  return new UserAuthMiddleware(new UserRepository());
};
