// Base interface for all listener
export interface IChannelListener {
  getChannelName(): string;
  handleNotification(payload: string): void;
}
