import {NotificationError} from "./Notification";

describe('Unit test for notificaton', ()=>{


    it('should create errors', () => {

        const notification = new NotificationError()
        const error = {
            message: 'error message',
            context: 'user'
        }

        notification.addError(error)
        expect(notification.messages('user')).toBe('user: error message, ')

        const error2 = {
            message: 'error message2',
            context: 'user'
        }
        notification.addError(error2)
        expect(notification.messages('user')).toBe('user: error message, user: error message2, ')


        const error3 = {
            message: 'error message test',
            context: 'test'
        }
        notification.addError(error3)
        expect(notification.messages('user')).toBe('user: error message, user: error message2, ')
    });
})