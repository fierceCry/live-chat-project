import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
  ) {}

  create(createMessageDto: { sender: string; content: string }) {
    const message = this.messagesRepository.create(createMessageDto);
    return this.messagesRepository.save(message);
  }

  findAll() {
    return this.messagesRepository.find();
  }
}
