import { Body, Controller, Post} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from 'src/auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService
  ) {}

  @Post('signup')
  async signUp(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('nickname') nickname: string
  ) {
    const result = await this.userService.signUp(email, password, nickname);
    return { data: result };
  }

  @Post('signin')
  async signIn(@Body('email') email: string, @Body('password') password: string) {
    const result = await this.authService.login(email, password);
    console.log(result)
    return { data : result }
  }
}
