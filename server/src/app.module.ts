import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';

// Setup real-time listeners
import { ListenerService } from './listener/listener.service';
import { MessageChannelService } from './listener/message-channel.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? path.resolve(process.cwd(), '.production.env')
          : path.resolve(process.cwd(), '.development.env'),
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ListenerService, MessageChannelService],
})
export class AppModule {}
