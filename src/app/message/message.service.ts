import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Message } from './message';

const apiUrl = 'http://localhost:3000/api.messages/';

/**
 * Message Service class
 * @class
 * @description
 * Call REST APIs and update db.
 */
@Injectable()
export class MessageService {

  messageIsEdit = new EventEmitter<Message>();
  isEditable: boolean = false;
  messages: Message[] = [];
  constructor(private http: Http) { }

  /**
   * Get all messages from db.
   * @returns {Promise} Contains the array of messages or error data.
   */
  getMessages() {
    return this.http.get(apiUrl)
      .map((response: Response) => {
        const messages = response.json().obj;
        let transformedMessages: Message[] = [];
        for (let message of messages) {
            transformedMessages.push(new Message(message.content, message._id,));
        }
        this.messages = transformedMessages;
        return transformedMessages;
      })
      .catch((error: Response) => Observable.throw(error.json())
    );
  }

  /**
   * Create a new message data in db.
   * @param {Message} message a new message
   * @returns {Promise} Message object or an error data.
   */
  createMessage(message: Message) {
    const body = JSON.stringify(message);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(apiUrl, body, {headers: headers})
      .map((response: Response) => {
          const result = response.json();
          const message = new Message(result.obj.content, result.obj._id);
          this.messages.push(message);
          return message;
      })
      .catch((error: Response) => Observable.throw(error.json()));
  }

  /**
   * Notify that the Edit event is triggered.
   */
  editMessage(message: Message) {
    this.messageIsEdit.emit(message);
  }

  /**
   * Update an existing message data in db.
   * @param {Message} message an updated message
   * @returns {Promise} Response from db.
   */
  updateMessage(message: Message) {
    const body = JSON.stringify(message);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.patch(apiUrl + message.messageId, body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json())
    );
  }

  /**
   * Delete an existing message data in db.
   * @param {Message} message a message to be deleted.
   * @returns {Promise} Response from db.
   */
  deleteMessage(message: Message) {
    this.messages.splice(this.messages.indexOf(message), 1);
    return this.http.delete(apiUrl + message.messageId)
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json())
    );
  }

  /**
   * Check if messages can be changed.
   */
  checkIsEditable() {
    return this.isEditable;
  }

  /**
   * Enable or disable the edit mode.
   */
  toggleIsEditable() {
    this.isEditable = !this.isEditable;
  }
}
