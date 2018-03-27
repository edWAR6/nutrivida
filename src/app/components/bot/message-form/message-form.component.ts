import { Component, OnInit, Input, OnDestroy, ChangeDetectorRef } from '@angular/core';
// import { Message } from '@app/models/message';
import { WebSpeechService } from '../../../providers/web-speech.service';
import { Subscription } from 'rxjs/Subscription';
import { Message } from '../../../models/message';
import { DialogflowService } from '../../../providers/dialogflow.service';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.css'],
  providers: [WebSpeechService, DialogflowService],
})
export class MessageFormComponent implements OnInit, OnDestroy {
  webSpeechSubscription: Subscription;
  @Input('message')
  private message: Message;
  @Input('messages')
  private messages: Message[];
  recording: boolean;

  constructor(
  private webSpeechService: WebSpeechService,
  private changeDetectorRef: ChangeDetectorRef,
  private dialogflowService: DialogflowService) {
    this.message = new Message();
    this.messages = [];
    this.recording = false;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.stopAndSend();
  }

  onKey(event: any) {
    if (event.which === 13) {
      this.send();
    }
  }

  onRecord() {
    if (this.recording) {
      this.stopAndSend();
    } else {
      this.startWebSpeech();
    }
  }

  send() {
    if (this.message.content) {
      this.message.timestamp = new Date();
      this.message.type = 'text';
      this.message.origin = 'request';
      this.dialogflowService.getResponse(this.message.content).subscribe(this.receive.bind(this));
      this.messages.push(this.message);
      this.message = new Message();
      this.scrollToBottom();
    }
  }

  receive(response) {
    console.log(response);
    let content = '';
    if (response.result.fulfillment.messages.length > 0 && response.result.fulfillment.messages[0].speech.length > 0) {
      response.result.fulfillment.messages[0].speech.forEach((message, index) => {
        content += response.result.fulfillment.messages[0].speech[index] + '\n';
      });
    } else {
      content = response.result.fulfillment.speech;
    }
    this.messages.push(new Message(content, response.timestamp, 'text', 'response'));
    this.scrollToBottom();
  }

  scrollToBottom() {
    setTimeout(() => {
      const chat = document.getElementById('chat');
      chat.scroll({top: chat.scrollHeight, left: 0, behavior: 'smooth'});
    }, 100);
  }

  startWebSpeech() {
    this.recording = true;
    this.message = new Message();
    this.webSpeechSubscription = this.webSpeechService.start().subscribe((data: any) => {
      console.log('WebSpeechAPI: ' + JSON.stringify(data));
      if (data.type === 'tag') {
        this.message.content = data.value;
        this.send();
        this.stopAndSend(); // get the first result and stop listening...
      } else if (data.type === 'inter') {
        this.message.content = data.value;
        this.changeDetectorRef.detectChanges();
      }
    }, (error: any) => {
      console.log('WebSpeechAPI: ' + JSON.stringify(error));
      this.stopAndSend();
      // this.showAlert('Oops! Something wrong happened:', error.value, this.startWebSpeech.bind(this));
      alert('Oops! Something wrong happened:');
    });
  }

  stopAndSend() {
    this.recording = false;
    this.send();
    this.changeDetectorRef.detectChanges();
    this.webSpeechService.stop();
    if (this.webSpeechSubscription) {
      this.webSpeechSubscription.unsubscribe();
      this.webSpeechSubscription = null;
    }
  }
}
