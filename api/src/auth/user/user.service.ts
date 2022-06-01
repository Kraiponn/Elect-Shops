import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

import { AuthDto, UpdatedProfileDto, UserUpdatedPwdDto } from '../dto';
import * as bcrypt from 'bcrypt';
import {
  IJwtPayload,
  IProfileImage,
  ITokens,
  IUser,
  IUserResponse,
} from '../interfaces';
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
} from '@prisma/client/runtime';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import * as fsExtra from 'fs-extra';
import * as dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly cloudinaryService: CloudinaryService,
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
        refreshToken: hashToken,
      },
    });

    if (!user)
      throw new BadRequestException('User not found(Update refresh_token)');
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
          profileImage: {
            create: {
              public_id: '',
              secure_url: '',
            },
          },
        },
      });

      const { access_token, refresh_token } = await this.getTokens(
        user.id,
        email,
      );

      await this.updateRefreshToken(user.id, refresh_token);

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
  async signin({ email, password }: AuthDto): Promise<IUserResponse & ITokens> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!user) throw new BadRequestException('Invalid email or password');

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

    const profileImage = await this.prismaService.profileImage.findUnique({
      where: { userId: user.id },
    });

    const payload: IUser = {
      id: user.id,
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user.email,
      phone: user?.phone,
      address: user?.address,
      dateOfBirth: user?.dateOfBirth,
      userType: user.userType,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      profileImage,
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

    return { message: 'Password update is successfully' };
  }

  /****************************
   * Update Profile
   */
  async updatedProfile(
    userId: number,
    body: UpdatedProfileDto,
    file: Express.Multer.File,
  ): Promise<{ message: string }> {
    const { firstName, lastName, phone, address, dateOfBirth } = body;
    let uploadedResult: IProfileImage;
    // dayjs.extend(utc);

    if (file) {
      const userImage = await this.prismaService.user.findUnique({
        where: { id: userId },
        select: {
          profileImage: {
            select: {
              public_id: true,
              secure_url: true,
            },
          },
        },
      });

      if (
        userImage?.profileImage?.public_id ||
        userImage?.profileImage?.secure_url
      ) {
        await this.cloudinaryService.removeImage(
          userImage.profileImage.public_id,
        );
      }

      // console.log('Having a file upload', file);
      uploadedResult = await this.cloudinaryService.uploadImage(file);

      // Remove image from the temporary path
      await fsExtra.remove(file.path);
    }

    const user = await this.prismaService.user.update({
      where: { id: userId },
      data: {
        firstName: firstName ? firstName : '',
        lastName: lastName ? lastName : '',
        phone: phone ? phone : '',
        address: address ? address : '',
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        profileImage: {
          upsert: {
            update: {
              public_id: uploadedResult?.public_id
                ? uploadedResult.public_id
                : '',
              secure_url: uploadedResult?.secure_url
                ? uploadedResult.secure_url
                : '',
            },
            create: {
              public_id: uploadedResult?.public_id
                ? uploadedResult.public_id
                : '',
              secure_url: uploadedResult?.secure_url
                ? uploadedResult.secure_url
                : '',
            },
          },
        },
      },
    });

    if (!user) throw new BadRequestException('User not found');

    return { message: 'Profile updated is successfully' };
  }

  /*********************************************
   * Reuest new access token by refresh token
   */
  async getAccessToken(userId: number, refreshToken: string): Promise<any> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
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

  /*********************************************
   * Update image to user
   */
  async updateProfileImage(
    userId: number,
    file: Express.Multer.File,
  ): Promise<{ message: string } | any> {
    // console.log(file);
    // await fsExtra.remove(`${file.path}`);
    await this.prismaService.user.findMany({
      where: {
        firstName: {
          mode: 'insensitive',
          contains: 'kraipon',
        },
      },
    });

    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new BadRequestException(`User not found`);

    const uploadImg = await this.cloudinaryService.uploadImage(file);
    if (!uploadImg)
      throw new InternalServerErrorException(`Invalid upload image`);

    try {
      await this.prismaService.profileImage.create({
        data: {
          public_id: uploadImg.public_id,
          secure_url: uploadImg.secure_url,
          userId: user.id,
        },
      });

      return { message: 'Image updated is successfully' };
    } catch (error) {
      if (error instanceof PrismaClientUnknownRequestError) {
        console.log('Upload error log', error);
      }

      throw new InternalServerErrorException('Create image error');
    }
  }
}
