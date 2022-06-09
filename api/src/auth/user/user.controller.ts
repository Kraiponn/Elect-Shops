import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { RefreshTokenPayload } from '../decorators';
import { UserIdFromJwt } from '../decorators/user-id-from-jwt.decorator';
import { AuthDto, UpdatedProfileDto, UserUpdatedPwdDto } from '../dto';
import { AccessTokenGuard, RefreshTokenGuard } from '../guards';
import { IJwtPayloadWithRefreshToken } from '../interfaces';
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
  async signup(
    @Res({ passthrough: true }) res: Response,
    @Body() body: AuthDto,
  ) {
    const { user, access_token, refresh_token } = await this.userService.signup(
      body,
    );

    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: this.configService.get<string>('NODE_ENV') !== 'development',
      sameSite: 'strict',
    });

    return {
      user,
      access_token,
    };
  }

  /********************************
   * desc      Signin
   * route     Post /api/auth/user/signin
   * access    Public
   */
  @Post('/signin')
  async signin(
    @Res({ passthrough: true }) res: Response,
    @Body() body: AuthDto,
  ) {
    const resp = await this.userService.signin(body);

    // Set the secure cookie with httpOnly flag
    res.cookie('refresh_token', resp.refresh_token, { httpOnly: true });
    delete resp.refresh_token;

    return {
      ...resp,
    };
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
  @UseInterceptors(FileInterceptor('image'))
  updatedProfile(
    @UserIdFromJwt() userId: number,
    @Body() body: UpdatedProfileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.updatedProfile(userId, body, file);
  }

  /********************************
   * desc      Remove account
   * route     Delete /api/auth/user/:userId
   * access    Private
   */
  @UseGuards(AccessTokenGuard)
  @Delete('/:userId')
  @HttpCode(HttpStatus.OK)
  deletAccount(@Param('userId') userId: number) {
    return this.userService.removeAccount(Number(userId));
  }

  /*********************************************************
   * desc      Request a new access_token by refresh_token
   * route     Get /api/auth/user/refresh-token/:userId
   * access    Private
   */
  @UseGuards(RefreshTokenGuard)
  @Get('refresh-token/:userId')
  async getNewAccessToken(
    @Res({ passthrough: true }) res: Response,
    @Param('userId') userId: string,
    @RefreshTokenPayload() payload: IJwtPayloadWithRefreshToken,
  ) {
    const { access_token, refresh_token } =
      await this.userService.getAccessToken(
        parseInt(userId),
        payload.refresh_token,
      );

    // Secure cookie
    res.cookie('refresh_token', refresh_token, { httpOnly: true });

    return {
      access_token,
    };
  }
}
