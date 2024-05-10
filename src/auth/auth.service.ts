import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'entities/Users';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.usersRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'nickname'],
    });
    if (!user) {
      throw new ForbiddenException('사용자를 찾을 수 없습니다');
    }
    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) {
      throw new ForbiddenException('비밀번호가 일치하지 않습니다');
    }

    const payload = { email: user.email, user_id: user.id };
    return {
      nickName: user.nickname,
      accessToken: this.jwtService.sign(payload),
    };
  }

  async validateUser(tokenObj: { accessToken: string }) {
    try {
      const payload = this.jwtService.verify(tokenObj.accessToken, {
        secret: process.env.JWT_SECRET_KEY,
      });
      const user = await this.usersRepository.findOne({
        where: { id: payload.user_id },
        select: ['id', 'nickname'],
      });

      if (!user) {
        return null;
      }

      return { userId: user.id, nickName: user.nickname };
    } catch (error) {
      console.error('토큰 검증 실패:', error);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
