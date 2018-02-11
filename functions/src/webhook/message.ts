import { SimpleResponses } from "./simpleResponse";

class Message {
  platform: Platform;
  simpleResponses: SimpleResponses;
  constructor(platform: Platform, simpleResponses?: SimpleResponses) {
    this.platform = platform;
    this.simpleResponses = simpleResponses;
  }
}

enum Platform {
  unspecified = 'PLATFORM_UNSPECIFIED',
  google = 'ACTIONS_ON_GOOGLE',
  facebook = 'FACEBOOK'
}

export {Message, Platform};
