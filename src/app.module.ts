import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesModule } from './messages/messages.module';
import { ChatGateway } from './chat/chat.gateway';
import { ConfigModule } from '@nestjs/config';
import dotenv from "dotenv";
import { Message } from './messages/message.entity/message.entity';
import { MorganModule } from 'nest-morgan';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        Message
      ],
      synchronize: true,
      logging: true
    }),
    MorganModule,
    MessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
