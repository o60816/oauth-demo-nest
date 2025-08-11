import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { inspect } from 'util';

@Injectable()
export class UsersService {
  constructor() {}
  async oauth(authCode: string) {
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
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
}
