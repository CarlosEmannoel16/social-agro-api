export type notificationError = {
    message: string
    context: string
}

export class NotificationError{
    private errors: notificationError[] = []

    addError(error: notificationError){
        this.errors.push(error)
    }

    messages(context: string){
        let messages: string = ''
         this.errors.forEach(e => {
            if(e.context === context)
           messages += `${e.context}: ${e.message}, `
        })

        return messages
    }
}