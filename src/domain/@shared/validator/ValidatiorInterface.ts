export interface ValidatorInterface<T> {
    validate(data: T): Promise<void>;
}