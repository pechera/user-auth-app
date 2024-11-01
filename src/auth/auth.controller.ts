import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';

import { SingUpDto } from './dto/signup.dto';
import { SingInDto } from './dto/signin.dto';
import { TokenDto } from './dto/token.dto';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() singUpDto: SingUpDto) {
    const { username, fullname, password } = singUpDto;
    return this.authService.signUp(username, fullname, password);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() singInDto: SingInDto) {
    const { username, password } = singInDto;
    return this.authService.signIn(username, password);
  }

  @Post('token')
  @HttpCode(HttpStatus.OK)
  public async getUserData(@Body() tokenDto: TokenDto) {
    const token = tokenDto.token;
    return this.authService.getUserData(token);
  }
}
