import { Message } from "./message";

class Response {
  fulfillmentText: string;
  fulfillmentMessages: Array<Message>
  constructor(fulfillmentText?: string, fulfillmentMessages: Array<Message> = []){
    this.fulfillmentText = fulfillmentText;
    this.fulfillmentMessages = fulfillmentMessages;
  }
}

export {Response};