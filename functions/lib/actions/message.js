"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("../collections/messages");
function saveMessage(action, message) {
    return messages_1.addMessage(action, message);
}
exports.saveMessage = saveMessage;
//# sourceMappingURL=message.js.map