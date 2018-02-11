import { addMessage } from "../collections/messages";

function saveMessage(action: string, message: string) {
  return addMessage(action, message);
}

export {saveMessage}
