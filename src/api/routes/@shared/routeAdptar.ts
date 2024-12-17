import { ControllerInterface } from "@/_shared/interfaces/ControllerInterface";

export const routeAdapter = (route: ControllerInterface) => {
  return async (req: any, res: any) => {
    return route.handle(req, res);
  };
};
