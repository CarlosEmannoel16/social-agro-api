export interface MapperProtocol<T, R> {
  map(data: T[]): R[];
}
