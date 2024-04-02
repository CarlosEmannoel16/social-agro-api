import { User } from "../../user/entity/User";
import UserCreatedEvent from "../../user/events/UserCreated.event";
import SendEmailWhenUserIsCreatedHandler from "../../user/events/handler/SendEmailWhenUserIsCreated.handler";
import EventDispatcher from "./EventDispatcher";

describe("Domain Events Test", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenUserIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      1
    );
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenUserIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      0
    );
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenUserIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    eventDispatcher.unregisterAll();

    expect(eventDispatcher.getEventHandlers).toMatchObject({});
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenUserIsCreatedHandler();
    const spyHandle = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("UserCreatedEvent", eventHandler);

    const user = new User(
      "001",
      "Emannoel",
      "carlosemannoel2019@gmail.com",
      "123456",
      new Date(),
      new Date()
    );

    const userCreatedEvent = new UserCreatedEvent(user);

    //Quando o notify for executado o senEmailWhenUserIsCreatedHandler.handle será executado
    eventDispatcher.notify(userCreatedEvent);

    expect(spyHandle).toHaveBeenCalledTimes(1);
  });
});
