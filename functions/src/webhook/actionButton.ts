import { OpenUriAction } from "./openUriAction";

class ActionButton {
  title: string;
  openUriAction: OpenUriAction;
  constructor(title: string, openUriAction: OpenUriAction) {
    this.title = title;
    this.openUriAction = openUriAction;
  }
}

export {ActionButton};
