import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserContent } from '../../entities/UserContent';
import { MessagesService } from '../messages/messages.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserContent])],
  providers: [MessagesService],
  exports: [MessagesService]
})
export class ChatModule {}
