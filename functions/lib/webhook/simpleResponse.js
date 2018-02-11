"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SimpleResponses {
    constructor(simpleResponses = []) {
        this.simpleResponses = simpleResponses;
    }
}
exports.SimpleResponses = SimpleResponses;
class SimpleResponse {
    constructor(speech, text) {
        this.display_text = text;
        this.text_to_speech = speech;
    }
}
exports.SimpleResponse = SimpleResponse;
//# sourceMappingURL=simpleResponse.js.map