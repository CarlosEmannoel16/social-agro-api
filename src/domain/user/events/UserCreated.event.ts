import { User } from "../entity/User";
import EventInterface from "../../_shared/event/event.interface";

export default class UserCreatedEvent implements EventInterface {
    dateTimeOccurred: Date;
    eventData: any;

    constructor(eventData: User) {
        this.dateTimeOccurred = new Date();
        this.eventData = eventData;
    }
   
}