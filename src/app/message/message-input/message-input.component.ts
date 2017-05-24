import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Message } from '../message';
import { MessageService } from "../message.service";

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.css']
})

/**
 * MessageInputComponent class
 * @class
 * @description
 * Control the MessageInputComponent.
 */
export class MessageInputComponent implements OnInit {

  myForm: FormGroup;
  isEditable: boolean = false;
  message: Message;
  constructor(private messageService: MessageService) {
    this.myForm = new FormGroup({'message': new FormControl()});
  }

  /**
   * Recreate the input component with the content of the selected message
   * when it becomes editable.
   */
  ngOnInit() {
    this.messageService.messageIsEdit.subscribe(
      message => {
        this.message = message;
        this.myForm = new FormGroup({'message': new FormControl(this.message.content)});
      }
    )
  }

  /**
   * Create a new message or change an exisiting message.
   */
  onSubmit() {
    if (this.message) {
      // Edit
      this.message.content = this.myForm.value.message;
      this.messageService.updateMessage(this.message)
        .subscribe(
          response => console.log(response),
          error => console.error(error)
        );
    } else {
      // Create
      this.messageService.createMessage(new Message(this.myForm.value.message))
        .subscribe(
          response => console.log(response),
          error => console.error(error)
        );
    }
    this.myForm.reset();
    this.message = null;
  }

  /**
   * Check if messages can be changed.
   */
  onIsEditable() {
    return this.messageService.checkIsEditable();
  }

  /**
   * Enable or disable the edit mode.
   */
  toggleEditMode() {
    this.messageService.toggleIsEditable();
  }
}
