import UserRepository from "@/infra/repository/user/UserRepository";
import { UserAuthMiddleware } from "../../api/middlewares/UserMiddleware";
import { MiddlewareInterface } from "@/_shared/interfaces/MiddlewareInterface";

export const makeMiddlewareAuth = (): MiddlewareInterface => {
  return new UserAuthMiddleware(new UserRepository());
};
