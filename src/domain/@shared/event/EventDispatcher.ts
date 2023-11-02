import EventInterface from "./event.interface";
import EventDispatcherInterface from "./eventDispatcher.interface";
import EventHandlerInterface from "./eventHandler.interface";

export default class EventDispatcher implements EventDispatcherInterface {
  private eventHandlers: {
    [eventName: string]: EventHandlerInterface<EventInterface>[];
  } = {};

  get getEventHandlers(): {
    [eventName: string]: EventHandlerInterface<EventInterface>[];
  } {
    return this.eventHandlers;
  }
  notify(event: EventInterface): void {
    const eventName = event.constructor.name;
    if (this.eventHandlers[eventName]) {
      this.eventHandlers[eventName].forEach((eventHandler) => {
        eventHandler.handle(event);
      });
    }
  }
  register(
    eventName: string,
    eventHandler: EventHandlerInterface<EventInterface>
  ): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
      this.eventHandlers[eventName].push(eventHandler);
    }
  }
  unregister(
    eventName: string,
    eventHandler: EventHandlerInterface<EventInterface>
  ): void {
    if (this.eventHandlers[eventName]) {
      const handlerIndex = this.eventHandlers[eventName].indexOf(eventHandler);
      if (handlerIndex !== -1) {
        this.eventHandlers[eventName].splice(handlerIndex, 1);
      }
    }
  }
  unregisterAll(): void {
    this.eventHandlers = {};
  }
}
