import { Router } from "express";
import { UserAuthMiddleware } from "../middlewares/UserMiddleware";
import { AnimalRepository } from "@/infra/repository/animal/AnimalRepository";
import UserRepository from "@/infra/repository/user/UserRepository";
import FindUserUseCase from "@/usecase/user/find/FindUserUsecase";
import { FindUserController } from "@/presetation/controllers/user/FindUserController";
import CreateUserUseCase from "@/usecase/user/create/CreateUseUseCase";
import { GenerateTokenService } from "@/domain/user/services/GenerateTokenService";
import { ValidateUserEmail } from "@/domain/user/services/ValidateUserEmail";
import { CreateUserController } from "@/presetation/controllers/user/CreateUserController";
import upload from "../../config/upload";
import { UpdateUserUseCase } from "@/usecase/user/update/UpdateUseCase";
import { UpdateUserController } from "@/presetation/controllers/user/UpdateUserController";


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
