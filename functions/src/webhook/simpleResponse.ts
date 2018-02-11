class SimpleResponses {
  simpleResponses: Array<SimpleResponse>;
  constructor(simpleResponses: Array<SimpleResponse> = []) {
    this.simpleResponses = simpleResponses;
  }
}

class SimpleResponse {
  display_text: string;
  text_to_speech: string;
  constructor(speech: string, text: string) {
    this.display_text = text;
    this.text_to_speech = speech;
  }
}

export {SimpleResponses, SimpleResponse}