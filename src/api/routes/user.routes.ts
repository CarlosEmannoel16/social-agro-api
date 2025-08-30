import { Router } from "express";
import { UpdateUserController } from "@/presetation/controllers/user/UpdateUserController";
import { FindUserController } from "@/presetation/controllers/user/FindUserController";
import { UpdateUserUseCase } from "@/usecase/user/update/UpdateUseCase";
import UserRepository from "@/infra/repository/user/UserRepository";
import { UserAuthMiddleware } from "../middlewares/UserMiddleware";
import FindUserUseCase from "@/usecase/user/find/FindUserUsecase";
import upload from "../../config/upload";


const userRepository = new UserRepository();

export const userRoutes = (router: Router) => {
  const auth = new UserAuthMiddleware(userRepository).execute;

  router.get("/user/:id", auth, (req, res) => {
    const findUserUseCase = new FindUserUseCase(userRepository);
    new FindUserController(findUserUseCase).handle(req, res);
  });



  router.put("/user", auth, upload.single("file"), (req, res) => {
    const updateUserUseCase = new UpdateUserUseCase(userRepository);
    new UpdateUserController(updateUserUseCase).handle(req, res);
  });
};
