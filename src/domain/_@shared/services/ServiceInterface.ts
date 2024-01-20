export interface ServiceInterface<T, A> {
  handle(data: T): Promise<A>;
}
