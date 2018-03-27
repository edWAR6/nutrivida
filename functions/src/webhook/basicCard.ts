import { Image } from "./image";
import { ActionButton } from "./actionButton";

class BasicCard {
  title: string;
  subtitle: string;
  formattedText: string;
  image: Image;
  buttons: Array<ActionButton>;
  constructor(formatedText: string, title?: string, subtitle?: string, image?: Image, buttons?: Array<ActionButton>) {
    this.title = title;
    this.subtitle = subtitle;
    this.formattedText = formatedText;
    this.image = image;
    this.buttons = buttons;
  }
}

export {BasicCard};
