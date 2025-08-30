import { AuthenticationController } from "@/presetation/controllers/authentication/AuthenticationController";
import { CreateUserController } from "@/presetation/controllers/user/CreateUserController";
import { GenerateTokenService } from "@/domain/user/services/GenerateTokenService";
import { ValidateUserEmail } from "@/domain/user/services/ValidateUserEmail";
import CreateUserUseCase from "@/usecase/user/create/CreateUseUseCase";
import UserRepository from "@/infra/repository/UserRepository";
import { AuthUseCase } from "@/usecase/auth/auth";
import express from "express";
const userRepository = new UserRepository();

const router = express.Router();

router.post("/auth", (req, res, next) => {
  const createUserUseCase = new AuthUseCase(userRepository);
  new AuthenticationController(createUserUseCase).handle(req, res, next);
});

router.post("/user/register", (req, res, next) => {
  const createUserUseCase = new CreateUserUseCase(
    userRepository,
    new GenerateTokenService(),
    new ValidateUserEmail(userRepository)
  );
  new CreateUserController(createUserUseCase).handle(req, res, next);
});

export default router;
