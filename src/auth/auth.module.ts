// auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'entities/Users';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
  ],
  providers: [AuthService, JwtService],
  exports: [AuthService]
})
export class AuthModule {}
