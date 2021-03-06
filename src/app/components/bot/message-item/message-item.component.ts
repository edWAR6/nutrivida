import { Component, OnInit, Input } from '@angular/core';
import { Message } from '@app/models/message';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  @Input('message')
  private message: Message;

  constructor() { }

  ngOnInit() {
  }

}
