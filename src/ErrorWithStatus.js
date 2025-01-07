export class ErrorWithStatus extends Error {
  constructor(status, Message) {
    super(Message);
    this.status = status;
  }
}
