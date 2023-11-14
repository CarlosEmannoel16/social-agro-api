export interface MapperProtocol<T, R>{
    map(data: Array<T>): R
}