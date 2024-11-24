import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageChannelService {
  handleNotification(payload: string) {
    console.log('Handling message channel notification:', payload);
    const [action, id] = payload.split(':');
    console.log(`Action: ${action}, ID: ${id}`);
  }
}
