import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './message.entity/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  controllers: [MessagesController],
  providers: [MessagesService],
  exports: [MessagesService] // MessagesService를 다른 모듈에서 사용할 수 있도록 내보내기

})
export class MessagesModule {}
