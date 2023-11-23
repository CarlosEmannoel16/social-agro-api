import { UserAuthMiddleware } from "../../api/middlewares/UserMiddleware";
import UserRepository from "../../infra/user/repository/UserRepository";
import { MiddlewareProtocol } from "../controllers/@shared/MiddlewareProtocol";

export const makeMiddlewareAuth = (): MiddlewareProtocol => {
  return new UserAuthMiddleware(new UserRepository());
};
