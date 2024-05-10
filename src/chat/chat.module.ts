// chat.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserContent } from '../../entities/UserContent';
import { MessagesService } from '../messages/messages.service'; // MessagesService import
import { MessagesController } from '../messages/messages.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserContent])],
  controllers: [MessagesController],
  providers: [MessagesService], // MessagesService를 providers에 추가
  exports: [MessagesService], // MessagesService를 export하여 다른 모듈에서도 사용할 수 있도록 함
})
export class ChatModule {}
