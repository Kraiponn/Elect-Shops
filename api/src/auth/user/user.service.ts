import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

import { AuthDto } from '../dto';
import * as bcrypt from 'bcrypt';
import { IJwtPayload, ITokens, IUserResponse } from '../interfaces';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

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
  async hashData(data: string): Promise<string> {
    return await bcrypt.hash(data, 10);
  }

  async compareData(data: string, hashData: string): Promise<boolean> {
    return await bcrypt.compare(data, hashData);
  }

  async getTokens(userId: number, email: string): Promise<ITokens> {
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
        expiresIn: '1m',
      }),
    ]);

    return {
      access_token,
      refresh_token,
    };
  }

  async updateRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<void> {
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

      const userPayload: IUserResponse = {
        id: user.id,
        email: user.email,
        userType: user.userType,
      };

      return {
        ...userPayload,
        access_token,
        refresh_token,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('This email alread exists');
        }
      }
    }
  }

  /****************************
   * Sign In
   */
  async signin({ email, password }: AuthDto): Promise<any> {
    return '';
  }

  /****************************
   * Sign Out
   */
  async Logout(userId: number): Promise<any> {
    return '';
  }

  /****************************
   * Get Profile
   */
  async getProfile(userId: number): Promise<any> {
    return '';
  }
}
