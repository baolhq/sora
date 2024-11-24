import { Injectable } from '@nestjs/common';
import { IChannelListener } from './ichannel-listener';

@Injectable()
export class MessageChannelService implements IChannelListener {
  getChannelName() {
    return 'message_channel';
  }

  handleNotification(payload: string) {
    console.log('Handling message channel notification:', payload);
    const [action, id] = payload.split(':');
    console.log(`Action: ${action}, ID: ${id}`);
  }
}
