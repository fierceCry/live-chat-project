import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesModule } from './messages/messages.module';
import { ChatGateway } from './chat/chat.gateway';
import { ConfigModule } from '@nestjs/config';
import dotenv from "dotenv";
import { UserContent } from '../entities/UserContent';
import { MorganModule } from 'nest-morgan';
import { UsersModule } from './users/users.module';
import { Users } from 'entities/Users';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';

dotenv.config();

@Global()
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
        Users,
        UserContent
      ],
      synchronize: false,
      logging: true
    }),
    MorganModule,
    MessagesModule,
    UsersModule,
    AuthModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
