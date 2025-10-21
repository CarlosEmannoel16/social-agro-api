import { InputAuthUseCase, OutputAuthUseCase } from './authDTO';
import { UserRepositoryInterface } from '../../domain/user/interfaces/UserRepositoryInterface';
import { ValidationError } from '@/_shared/errors/Errors';

import jwt from 'jsonwebtoken';
export class AuthUseCase {
  constructor(private readonly userRepository: UserRepositoryInterface) {}
  async execute(input: InputAuthUseCase): Promise<OutputAuthUseCase> {
    const user = await this.userRepository.findByEmail(input.email);
    if (!user) throw new ValidationError('Email ou senha incorretos');

    const isCorrectPassword = user.password.trim() === input.password.trim();
    if (!isCorrectPassword)
      throw new ValidationError('Email ou senha incorretos');

    const token = jwt.sign({ id: user.id }, 'eee88@09955%$#/', {
      expiresIn: '7 days',
    });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
