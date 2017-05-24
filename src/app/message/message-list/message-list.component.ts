import { Component, OnInit } from '@angular/core';
import { Message } from '../message';
import { MessageService } from "../message.service";

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})

/**
 * MessageListComponent class
 * @class
 * @description
 * Control the MessageListComponent.
 */
export class MessageListComponent implements OnInit {

  messages: Message[] = [];
  isEditable: boolean = false;

  constructor(private messageService: MessageService) { }

  /**
   * Get all data from db.
   */
  ngOnInit() {
    this.messageService.getMessages()
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
        }
      );
  }

  /**
   * Check if messages can be changed.
   */
  onIsEditable() {
    return this.messageService.checkIsEditable();
  }

  /**
   * Change and save existing messages.
   */
  onEdit(message: Message) {
    this.messageService.editMessage(message);
  }

  /**
   * Delete existing messages.
   */
  onDelete(message: Message) {
    this.messageService.deleteMessage(message).subscribe(
      result => console.log(result)
    );
  }

}
