"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Message {
    constructor(platform, simpleResponses) {
        this.platform = platform;
        this.simpleResponses = simpleResponses;
    }
}
exports.Message = Message;
var Platform;
(function (Platform) {
    Platform["unspecified"] = "PLATFORM_UNSPECIFIED";
    Platform["google"] = "ACTIONS_ON_GOOGLE";
    Platform["facebook"] = "FACEBOOK";
})(Platform || (Platform = {}));
exports.Platform = Platform;
//# sourceMappingURL=message.js.map