import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserContent } from '../../entities/UserContent';
import { Users } from 'entities/Users';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(UserContent)
    private messagesRepository: Repository<UserContent>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async create(userId: number, content: string){
    try {
      const message = this.messagesRepository.create({
        user: { id: userId },
        content,
      });
      return this.messagesRepository.save(message);
    } catch (error) {
      throw new Error(`Error creating message: ${error.message}`);
    }
  }
  
  async findAll() {
    const result = await this.messagesRepository.query(`
      SELECT
        uc.id AS id,
        uc.content AS content,
        uc.createdAt AS created_at,
        u.nickname AS nickName
      FROM user_contents uc
      JOIN users u ON uc.user_id = u.id
    `);
    return result;
  }
  
}
