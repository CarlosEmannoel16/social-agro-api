import { UserAuthMiddleware } from "../../api/middlewares/UserMiddleware";

export const makeMiddlewareAuth = () => {
  return new UserAuthMiddleware().execute
};
