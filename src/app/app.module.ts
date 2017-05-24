import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MessageService } from './message/message.service';
import { MessageListComponent } from './message/message-list/message-list.component';
import { MessageInputComponent } from './message/message-input/message-input.component';

@NgModule({
  declarations: [
    AppComponent,
    MessageListComponent,
    MessageInputComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
