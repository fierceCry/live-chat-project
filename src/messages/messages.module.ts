import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserContent } from '../../entities/UserContent';
import { Users } from 'entities/Users';

@Module({
  imports: [TypeOrmModule.forFeature([UserContent, Users])],
  controllers: [MessagesController],
  providers: [MessagesService],
  exports: [MessagesService]

})
export class MessagesModule {}
