export interface RepositoryInterface<T> {
  create(item: T): Promise<T>;
  update(item: T): Promise<void>;
  find(id: string): Promise<T>;
  findAll(): Promise<T[]>;
}
