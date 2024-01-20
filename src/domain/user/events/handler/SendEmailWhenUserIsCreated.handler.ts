import EventHandlerInterface from "../../../_@shared/event/eventHandler.interface";
import UserCreatedEvent from "../UserCreated.event";

export default class SendEmailWhenUserIsCreatedHandler implements EventHandlerInterface<UserCreatedEvent> {
    handle(event: UserCreatedEvent): void {
       console.log(`Send email to ....`);
    }
}