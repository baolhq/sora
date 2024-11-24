import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Client, Notification } from 'pg';
import { MessageChannelService } from './message-channel.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ListenerService implements OnModuleInit, OnModuleDestroy {
  private client: Client;

  constructor(
    private configService: ConfigService,
    private messageChannelService: MessageChannelService,
  ) {}

  async onModuleInit() {
    this.client = new Client({
      host: this.configService.get('DB_HOST'),
      port: this.configService.get('DB_PORT'),
      database: this.configService.get('DB_NAME'),
      user: this.configService.get('DB_USER'),
      password: this.configService.get('DB_PASSWD'),
    });
    await this.client.connect();

    // Set up the notification handler
    this.client.on('notification', (notification) => {
      this.handleNotification(notification);
    });
    console.log('Listening to PostgreSQL notifications..');
  }

  // Handle the notifications
  handleNotification(notification: Notification) {
    // Check which channel the notification is from and handle accordingly
    switch (notification.channel) {
      case 'message_channel':
        this.messageChannelService.handleNotification(notification.payload);
        break;

      default:
        console.log('Unknown channel:', notification.channel);
    }
  }

  // Close the connection when the module is destroyed
  async onModuleDestroy() {
    await this.client.end();
    console.log('Listener service disconnected.');
  }
}
