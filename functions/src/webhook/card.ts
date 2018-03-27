import { Button } from "./button";

class Card {
  title: string;
  subtitle: string;
  imageUri: string;
  buttons: Array<Button>;
  constructor(title: string, subtitle: string, imageUri: string, buttons: Array<Button>) {
    this.title = title;
    this.subtitle = subtitle;
    this.imageUri = imageUri;
    this.buttons = buttons;
  }
}

export {Card};
