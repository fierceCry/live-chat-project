import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'entities/Users';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async signUp(
    email: string,
    password: string,
    nickname: string,
  ) {
      const user = await this.usersRepository.findOne({
        where: {
          email: email,
        },
      });
      if (user) {
        throw new ForbiddenException('이미 존재하는 사용자입니다');
      }
      const hashedPassword = await bcrypt.hash(
        password,
        parseInt(process.env.HASHSALT)
      );

      await this.usersRepository.save({
        email,
        nickname,
        password: hashedPassword
      });

      return '회원가입 완료했습니다';
  }
}
