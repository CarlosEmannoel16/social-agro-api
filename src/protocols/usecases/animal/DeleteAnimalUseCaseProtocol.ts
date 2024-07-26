export interface DeleteAnimalUseCaseProtocol {
  handle(id: string, userId: string): Promise<void>;
}
