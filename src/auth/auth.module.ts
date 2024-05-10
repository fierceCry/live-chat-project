// auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt'; // JwtModule을 임포트
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'entities/Users';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    JwtModule.registerAsync({ // JwtModule을 올바르게 임포트하고 설정
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  providers: [AuthService, JwtService],
  exports: [AuthService], // AuthService를 export하여 다른 모듈에서 사용할 수 있도록 함
})
export class AuthModule {}
