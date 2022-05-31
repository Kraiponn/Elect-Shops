import {
  BadRequestException,
  Body,
  Controller,
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
import { UserType } from '@prisma/client';
import { Response } from 'express';
import { RefreshTokenPayload, Roles } from '../decorators';
import { UserIdFromJwt } from '../decorators/user-id-from-jwt.decorator';
import { AuthDto, UpdatedProfileDto, UserUpdatedPwdDto } from '../dto';
import { AccessTokenGuard, RefreshTokenGuard } from '../guards';
import { IJwtPayloadWithRefreshToken } from '../interfaces';
import { AccessTokenStrategy } from '../strategies';
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
    const result = await this.userService.signup(body);

    res.cookie('refresh_token', result.refresh_token, {
      httpOnly: true,
      secure: this.configService.get<string>('NODE_ENV') !== 'development',
      sameSite: 'strict',
    });

    return {
      user: result.user,
      access_token: result.access_token,
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
    const resp = await this.userService.signin(res, body);

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
  updatedProfile(
    @UserIdFromJwt() userId: number,
    @Body() body: UpdatedProfileDto,
  ) {
    return this.userService.updatedProfile(userId, body);
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

  /*********************************************************
   * desc      Update image to user
   * route     Post /api/auth/user/update-profile-image
   * access    Private
   */
  @UseGuards(AccessTokenGuard)
  @Post('update-profile-image')
  @UseInterceptors(FileInterceptor('image'))
  updatedProfileImage(
    @UserIdFromJwt() userId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // console.log('Upload', file);
    if (!file) throw new BadRequestException('Please specify image');

    return this.userService.updateProfileImage(userId, file);
  }
}
