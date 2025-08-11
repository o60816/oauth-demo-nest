import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoggingInterceptor } from 'src/interceptors/logging';

@UseInterceptors(LoggingInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('oauth')
  async oauth(@Query('code') authCode: string) {
    const result = await this.usersService.oauth(authCode);
    return result;
  }
}
