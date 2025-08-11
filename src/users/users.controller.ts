import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { LoggingInterceptor } from 'src/interceptors/logging';
import { LoginDto } from './dto/create-login.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@UseInterceptors(LoggingInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('oauth')
  async oauth(@Query('code') authCode: string) {
    const result = await this.usersService.oauth(authCode);
    return result;
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const result = await this.usersService.login(loginDto);
    return result;
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getUser(@Param('id') userId: string) {
    const result = await this.usersService.getUser(userId);
    return result;
  }
}
