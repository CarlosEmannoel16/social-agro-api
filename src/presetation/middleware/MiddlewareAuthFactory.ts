import UserRepository from "@/infra/repository/user/UserRepository";
import { UserAuthMiddleware } from "../../api/middlewares/UserMiddleware";

export const makeMiddlewareAuth = () => {
  return new UserAuthMiddleware(new UserRepository()).execute
};
