import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserContent } from '../../entities/UserContent';

@Module({
  imports: [TypeOrmModule.forFeature([UserContent])],
  controllers: [MessagesController],
  providers: [MessagesService]
})
export class MessagesModule {}
