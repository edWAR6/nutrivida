import { SimpleResponses } from "./simpleResponse";
import { Card } from "./card";
import { BasicCard } from "./basicCard";
import { Text } from "./text";

class Message {
  platform: Platform;
  text: Text;
  simpleResponses: SimpleResponses;
  card: Card;
  basicCard: BasicCard;
  constructor(platform: Platform, text?: Text, simpleResponses?: SimpleResponses, card?: Card, basicCard?: BasicCard) {
    this.platform = platform;
    this.text = text;
    this.simpleResponses = simpleResponses;
    this.card = card;
    this.basicCard = basicCard;
  }
}

enum Platform {
  unspecified = 'PLATFORM_UNSPECIFIED',
  google = 'ACTIONS_ON_GOOGLE',
  facebook = 'FACEBOOK'
}

export {Message, Platform};
