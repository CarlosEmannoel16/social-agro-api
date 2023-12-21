export interface RepositoryInterface<T> {
  create(item: T): Promise<T>;
  update(item: T): Promise<void>;
  findAll(userId: string): Promise<T[]>;
}
