import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class SignUpDto {
  
  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: '비밀번호는 최소 8자 이상, 대문자, 소문자, 숫자 또는 특수문자를 포함해야 합니다.',
  })
  password: string;
  
  @IsNotEmpty()
  @IsString()
  nickname: string;
}
