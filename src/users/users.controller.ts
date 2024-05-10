import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from 'src/auth/auth.service';
import { SignUpDto } from './\bdto/SignUpDto';
import { LoginDto } from './\bdto/LoginDto';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  async signUp(@Body() data: SignUpDto) {
    const result = await this.userService.signUp(
      data.email,
      data.password,
      data.nickname,
    );
    return { data: result };
  }

  @Post('signin')
  async signIn(@Body() data: LoginDto) {
    const result = await this.authService.login(data.email, data.password);
    console.log(result);
    return { data: result };
  }
}
