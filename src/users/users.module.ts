import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';

const { JWT_TOKEN_KEY } = process.env;

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    JwtModule.register({
      global: true,
      secret: JWT_TOKEN_KEY,
      signOptions: { expiresIn: '60s' },
    }),
  ],
})
export class UsersModule {}
