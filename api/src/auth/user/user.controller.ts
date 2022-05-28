import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { UserIdFromJwt } from '../decorators/user-id-jwt.decorator';
import { AuthDto, UpdatedProfileDto, UserUpdatedPwdDto } from '../dto';
import { AccessTokenGuard } from '../guards';
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
  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Res() res: Response, @Body() body: AuthDto) {
    const result = await this.userService.signup(body);

    res.cookie('auth-jwt', result.refresh_token, {
      httpOnly: true,
      secure: this.configService.get<string>('NODE_ENV') !== 'development',
      sameSite: 'strict',
    });

    return res.status(HttpStatus.CREATED).json({
      message: 'Process is successful',
      user: result.user,
      access_token: result.access_token,
    });
  }

  /********************************
   * desc      Signin
   * route     Post /api/auth/user/signin
   * access    Public
   */
  @Post('/signin')
  async signin(@Res() res: Response, @Body() body: AuthDto) {
    const resp = await this.userService.signin(res, body);

    // Set the secure cookie with httpOnly flag
    res.cookie('refresh_token', resp.refresh_token, { httpOnly: true });
    delete resp.refresh_token;

    return res.status(HttpStatus.OK).json({
      ...resp,
    });
  }

  /********************************
   * desc      Get profile
   * route     Post /api/auth/user/me
   * access    Private
   */
  @UseGuards(AccessTokenGuard)
  @Get('/me')
  @HttpCode(HttpStatus.OK)
  getProfile(@UserIdFromJwt() userId: number) {
    return this.userService.getProfile(userId);
  }

  /********************************
   * desc      User signout
   * route     Get /api/auth/user/logout
   * access    Private
   */
  @UseGuards(AccessTokenGuard)
  @Get('/logout')
  @HttpCode(HttpStatus.OK)
  logout(@UserIdFromJwt() userId: number) {
    return this.userService.Logout(userId);
  }

  /********************************
   * desc      Update password
   * route     Post /api/auth/user/update-password
   * access    Private
   */
  @UseGuards(AccessTokenGuard)
  @Post('update-password')
  @HttpCode(HttpStatus.OK)
  updatedPassword(
    @UserIdFromJwt() userId: number,
    @Body() body: UserUpdatedPwdDto,
  ) {
    return this.userService.updatedPassword(userId, body);
  }

  /********************************
   * desc      Update profile
   * route     Post /api/auth/user/update-profile
   * access    Private
   */
  @UseGuards(AccessTokenGuard)
  @Post('update-profile')
  @HttpCode(HttpStatus.OK)
  updatedProfile(
    @UserIdFromJwt() userId: number,
    @Body() body: UpdatedProfileDto,
  ) {
    return this.userService.updatedProfile(userId, body);
  }
}
