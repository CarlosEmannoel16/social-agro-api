export interface EventInterface<P> {
  getName(): string;
  getDateTime(): Date;
  getPayload(): P;
}

export interface EventHandlerInterface {
  handle(event: EventInterface<any>): void;
}

export interface EventDispatcherInterface {
  register(event: string, handler: EventHandlerInterface): void;
  dispatch(event: EventInterface<any>): void;
  remove(event: string, handler: EventHandlerInterface): void;
  has(event: string, handler: EventHandlerInterface): boolean;
  clear(): void;
}
