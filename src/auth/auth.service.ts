import { ForbiddenException, Injectable } from '@nestjs/common';
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
      const token = tokenObj.accessToken;

      // JWT 검증
      const user = await this.jwtService.verify(token);
      if (!user) {
        return null;
      }
      const result = await this.usersRepository.findOne({
        where: { id: user.user_id },
        select: ['id', 'nickname']
      });
      // 검증된 토큰에서 사용자 정보 추출
      return { userId: result.id, nickName: result.nickname};
    } catch (error) {
      // 토큰 검증 실패 시
      console.error('토큰 검증 실패:', error);
      return null;
    }
  }

}
