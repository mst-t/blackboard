/**
 * Message class
 * @class
 * @description
 * Store Message data.
 */
export class Message {
    content: string;
    messageId?: string;

    constructor(content: string, messageId?: string) {
        this.content = content;
        this.messageId = messageId;
    }
}
