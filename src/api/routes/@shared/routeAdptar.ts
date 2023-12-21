import { ControllerProtocol } from "../../../presetation/controllers/@shared/ControllerProtocol";

export const routeAdapter = (route: ControllerProtocol) => {
  return async (req: any, res: any) => {
    return route.handle(req, res);
  };
};
