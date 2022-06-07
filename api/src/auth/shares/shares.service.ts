import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

// import * as fsExtra from 'fs-extra';
import * as bcrypt from 'bcrypt';
import { IJwtPayload, ITokens } from '../interfaces';

@Injectable()
export class SharesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

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
        expiresIn: '10m',
      }),
      this.jwtService.sign(payload, {
        secret: this.configService.get<string>('REFRESH_TOKEN_KEY'),
        expiresIn: '7d',
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
    const hashToken = await this.hashData(refreshToken);

    const user = await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken: hashToken,
      },
    });

    if (!user)
      throw new BadRequestException('User not found(Update refresh_token)');
  }
}
