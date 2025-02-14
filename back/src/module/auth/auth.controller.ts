import { Controller, Post, Body, UsePipes, ValidationPipe, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-auth.dto';
import { CreateUserDto } from './dto/createUser-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginUser: LoginUserDto) {
    return await this.authService.login(loginUser);
  }

  @Post('register')
  async CreateUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.CreateUser(createUserDto)
  }
}
