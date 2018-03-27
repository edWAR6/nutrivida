export class Message {
  content: string;
  timestamp: Date;
  type: string;
  origin: string;
  avatar: string;
  constructor(content?: string, timestamp?: Date, type?: string, origin?: string, avatar?: string) {
    this.content = content;
    this.timestamp = timestamp;
    this.type = type;
    this.origin = origin;
    this.avatar = avatar;
  }
}
