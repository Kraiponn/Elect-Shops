import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

import { AuthDto, UpdatedProfileDto, UserUpdatedPwdDto } from '../dto';
import * as bcrypt from 'bcrypt';
import { IJwtPayload, ITokens, IUser, IUserResponse } from '../interfaces';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Response } from 'express';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /********************************************************
   *              HELPER FUNCTIONS
   *******************************************************/
  private async hashData(data: string): Promise<string> {
    return await bcrypt.hash(data, 10);
  }

  private async compareData(data: string, hashData: string): Promise<boolean> {
    return await bcrypt.compare(data, hashData);
  }

  private async getTokens(userId: number, email: string): Promise<ITokens> {
    const payload: IJwtPayload = {
      sub: userId,
      email,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.sign(payload, {
        secret: this.configService.get<string>('ACCESS_TOKEN_KEY'),
        expiresIn: '1m',
      }),
      this.jwtService.sign(payload, {
        secret: this.configService.get<string>('REFRESH_TOKEN_KEY'),
        expiresIn: '5m',
      }),
    ]);

    return {
      access_token,
      refresh_token,
    };
  }

  private async updateRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<void> {
    const hashToken = await this.hashData(refreshToken);

    const user = await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken,
      },
    });

    if (!user) throw new BadRequestException('User not found');
  }

  ///////////////////////// Request Mehod /////////////////////////////////
  /****************************
   * Sign Up
   */
  async signup({ email, password }: AuthDto): Promise<IUserResponse & ITokens> {
    const pwdHash = await this.hashData(password);

    try {
      const user = await this.prismaService.user.create({
        data: {
          email,
          password: pwdHash,
        },
      });

      const { access_token, refresh_token } = await this.getTokens(
        user.id,
        email,
      );

      const userPayload: IUser = {
        id: user.id,
        email: user.email,
        userType: user.userType,
      };

      return {
        user: userPayload,
        access_token,
        refresh_token,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('This email alread exists');
        }
      }
    }
  }

  /****************************
   * Sign In
   */
  async signin(
    @Res() res: Response,
    { email, password }: AuthDto,
  ): Promise<IUserResponse & ITokens> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!user)
      throw new BadRequestException('There is no user with that email');

    const pwdMatches = await this.compareData(password, user.password);
    if (!pwdMatches) throw new BadRequestException('Password is incorrect');

    const { access_token, refresh_token } = await this.getTokens(
      user.id,
      email,
    );

    // Update or Add refresh_token field
    await this.updateRefreshToken(user.id, refresh_token);

    const userPayload: IUser = {
      id: user.id,
      email,
      userType: user.userType,
    };

    return {
      user: userPayload,
      access_token,
      refresh_token,
    };
  }

  /****************************
   * Get Profile
   */
  async getProfile(userId: number): Promise<any> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user)
      throw new NotFoundException(`User not found with id of ${userId}`);

    const image = await this.prismaService.image.findUnique({
      where: { userId: user.id },
    });

    const payload: IUser = {
      id: user.id,
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user.email,
      phone: user?.phone,
      userType: user.userType,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      image,
    };

    return {
      user: payload,
    };
  }

  /****************************
   * Sign Out
   */
  async Logout(userId: number): Promise<{ message: string }> {
    const user = await this.prismaService.user.updateMany({
      where: {
        id: userId,
        refreshToken: {
          not: null,
        },
      },
      data: {
        refreshToken: null,
        refreshTokenExpire: null,
      },
    });

    if (!user || user.count <= 0)
      throw new BadRequestException('Your account already logout.');

    return {
      message: 'Logout is successful',
    };
  }

  /****************************
   * Update password
   */
  async updatedPassword(
    userId: number,
    { currentPassword, newPassword }: UserUpdatedPwdDto,
  ): Promise<{ message: string }> {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new BadRequestException('User not found');

    const pwdMatches = await this.compareData(currentPassword, user.password);
    if (!pwdMatches)
      throw new BadRequestException(
        'The current password does not matche. Please entered a valid password.',
      );

    const hashPwd = await this.hashData(newPassword);
    const updateResult = await this.prismaService.user.update({
      where: { id: user.id },
      data: { password: hashPwd },
    });

    if (!updateResult)
      throw new BadRequestException('Access denied or User not found');

    return { message: 'Password updated is successfully' };
  }

  /****************************
   * Update Profile
   */
  async updatedProfile(
    userId: number,
    body: UpdatedProfileDto,
  ): Promise<{ message: string }> {
    const { firstName, lastName, phone } = body;

    const user = await this.prismaService.user.update({
      where: { id: userId },
      data: {
        firstName: firstName ? firstName : '',
        lastName: lastName ? lastName : '',
        phone: phone ? phone : '',
      },
    });

    if (!user) throw new BadRequestException('User not found');

    return { message: 'Profile updated is successfully' };
  }

  /*********************************************
   * Reuest new access token by refresh token
   */
  async getAccessToken(userId: number, refreshToken: string): Promise<ITokens> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: parseInt(userId),
      },
    });

    if (!user || !user.refreshToken) {
      throw new UnauthorizedException(
        'Not authorization to get the new access token or token is expire',
      );
    }

    const refreshTokenMatches = await this.compareData(
      refreshToken,
      user.refreshToken,
    );

    if (!refreshTokenMatches) {
      throw new UnauthorizedException(`Not authorized or token is expired`);
    }

    await this.updateRefreshToken(userId, refreshToken);
    const { access_token, refresh_token } = await this.getTokens(
      userId,
      user.email,
    );

    return {
      access_token,
      refresh_token,
    };
  }
}
