import { Component, OnInit } from '@angular/core';
import { Message } from '../../../models/message';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.css']
})
export class ChatBotComponent implements OnInit {
  public message: Message;
  public messages: Message[];

  constructor() {
    this.message = new Message();
    this.messages = [new Message('Hola, bienvenido', undefined, 'text', 'response')];
  }

  ngOnInit() {
  }

}
