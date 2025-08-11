import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { inspect } from 'util';
import { LoginDto } from './dto/create-login.dto';
import { OAuthResDto } from './dto/oauth.dto';
import { JwtService } from '@nestjs/jwt';

const { CLIENT_ID: clientId, CLIENT_SECRET: clientSecret } = process.env;

@Injectable()
export class UsersService {
  constructor(private jwtService: JwtService) {}
  async oauth(authCode: string): Promise<OAuthResDto> {
    const redirectUri = 'http://localhost:8080/users/oauth';
    const data = `code=${authCode}&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUri}&grant_type=authorization_code`;
    const token = await axios.post(
      'https://oauth2.googleapis.com/token',
      data,
      {
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
      },
    );
    console.log(`Token: ${inspect(token.data, false, null, true)}`);
    const { access_token } = token.data;
    const userInfoUri = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`;
    const userInfo = await axios.get(userInfoUri);
    return userInfo.data;
  }

  async login(loginDto: LoginDto) {
    return {
      ...loginDto,
      access_token: await this.jwtService.signAsync(loginDto),
    };
  }

  async getUser(userId: string) {
    return {
      id: userId,
      email: 'o60816@gmail.com',
      verified_email: true,
      name: '曹韻偉',
      given_name: '韻偉',
      family_name: '曹',
      picture:
        'https://lh3.googleusercontent.com/a/ACg8ocLPAR23GgPoZqQNRN9DqCBQRvlZ-i8zqHYHqF3I7npho9wDVA=s96-c',
    };
  }
}
