import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { AuthDto } from '../dto';
import { UserService } from './user.service';

@Controller('auth/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  /********************************
   * desc      Register new member
   * route     Post /api/auth/user/signin
   * access    Public
   */
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Res() res: Response, @Body() body: AuthDto) {
    const result = await this.userService.signup(body);

    res.cookie('auth-jwt', result.refresh_token, {
      httpOnly: true,
      secure: this.configService.get<string>('NODE_ENV') !== 'development',
      sameSite: 'strict',
    });

    return {
      message: 'Process is successful',
      user: {
        id: result.id,
        email: result.email,
        userType: result.userType,
        access_token: result.access_token,
      },
    };
  }
}
