import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

import { GetRefreshToken } from '../decorators';
import { GetUserId } from '../decorators/user-id.decorator';
import { AuthDto, UpdatedProfileDto, UserUpdatedPwdDto } from '../dto';
import { AccessTokenGuard, RefreshTokenGuard } from '../guards';
import { ITokenPayloadWithRefreshToken } from '../interfaces';
import { UserService } from './user.service';

@Controller('auth/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  /********************************
   * desc      Register new member
   * route     Post /v2/api/auth/user/signup
   * access    Public
   */
  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(
    @Res({ passthrough: true }) res: Response,
    @Body() body: AuthDto,
  ) {
    const { sub, email, role, access_token, refresh_token } =
      await this.userService.signup(body);

    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: this.configService.get<string>('NODE_ENV') !== 'development',
      sameSite: 'strict',
    });

    return {
      user: {
        sub,
        email,
        role,
      },
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
  async getProfileById(@GetUserId() userId: number): Promise<any> {
    return await this.userService.getProfileById(userId);
  }

  /********************************
   * desc      User signout
   * route     Get /api/auth/user/logout
   * access    Private
   */
  @UseGuards(AccessTokenGuard)
  @Get('/logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @GetUserId() userId: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    const resp = await this.userService.Logout(userId);
    res.clearCookie('refresh_token');

    return resp;
  }

  /********************************
   * desc      Update password
   * route     Post /api/auth/user/update-password/:userId
   * access    Private
   */
  @UseGuards(AccessTokenGuard)
  @Put('update-password/:userId')
  @HttpCode(HttpStatus.OK)
  updatedPassword(
    @Param('userId') userId: number,
    @GetUserId() userIdFromToken: number,
    @Body() body: UserUpdatedPwdDto,
  ): Promise<any> {
    if (Number(userId) !== userIdFromToken)
      throw new UnauthorizedException(
        'Access denied. Or your specific id is not matches with id in the token',
      );

    return this.userService.updatedPassword(Number(userId), body);
  }

  /********************************
   * desc      Update profile
   * route     Post /api/auth/user/update-profile
   * access    Private
   */
  @UseGuards(AccessTokenGuard)
  @Put('update-profile')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('image'))
  async updatedProfile(
    @GetUserId() userId: number,
    @Body() body: UpdatedProfileDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    return await this.userService.updatedProfile(userId, body, file);
  }

  /********************************
   * desc      Remove account
   * route     Delete /api/auth/user/:userId
   * access    Private
   */
  @UseGuards(AccessTokenGuard)
  @Delete('/:userId')
  @HttpCode(HttpStatus.OK)
  async deletAccount(
    @Param('userId') userId: number,
    @GetUserId() idFromToken: number,
  ): Promise<any> {
    if (Number(userId) !== idFromToken)
      throw new UnauthorizedException(
        'Access denied. Or your specific id is not matches with id in the token',
      );

    return await this.userService.removeAccount(Number(userId));
  }

  /*********************************************************
   * desc      Request a new access_token by refresh_token
   * route     Get /api/auth/user/refresh-token/:userId
   * access    Private
   */
  @UseGuards(RefreshTokenGuard)
  @Get('refresh-token')
  async getNewAccessToken(
    @Res({ passthrough: true }) res: Response,
    // @Param('userId') userId: string,
    @GetRefreshToken() payload: ITokenPayloadWithRefreshToken,
  ): Promise<any> {
    const { access_token, refresh_token } =
      await this.userService.getAccessToken(payload.sub, payload.refresh_token);

    // Secure cookie
    res.cookie('refresh_token', refresh_token, { httpOnly: true });

    return {
      access_token,
    };
  }
}
