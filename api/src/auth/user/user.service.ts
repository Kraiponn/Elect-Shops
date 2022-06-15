import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { AuthDto, UpdatedProfileDto, UserUpdatedPwdDto } from '../dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { SharesService } from '../shares/shares.service';

import * as fsExtra from 'fs-extra';

interface ITokenPayload {
  id: number;
  email: string;
  role: string;
}

interface ITokens {
  access_token: string;
  refresh_token: string;
}

interface IUser {
  id?: number;
  first_name?: string;
  last_name?: string;
  email: string;
  phone?: string;
  address?: string;
  date_of_birth?: Date;
  role: string;
  image_id?: string;
  image_url?: string;
  created_at?: Date;
  updated_at?: Date;
}

interface IImageUploadResponse {
  public_id: string;
  secure_url: string;
}

interface IMessageResponse {
  message: string;
}

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly sharedService: SharesService,
  ) {}

  /****************************
   * Sign Up
   */
  async signup({ email, password }: AuthDto): Promise<ITokenPayload & ITokens> {
    const pwdHash = await this.sharedService.hashData(password);

    try {
      const user = await this.prismaService.user.create({
        data: {
          email,
          password: pwdHash,
        },
      });

      const { access_token, refresh_token } =
        await this.sharedService.getTokens(user.id, email);

      await this.sharedService.updateRefreshToken(user.id, refresh_token);

      const payload: ITokenPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

      return {
        ...payload,
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
  async signin({ email, password }: AuthDto): Promise<ITokenPayload & ITokens> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!user) throw new BadRequestException('Invalid email or password');

    const pwdMatches = await this.sharedService.compareData(
      password,
      user.password,
    );
    if (!pwdMatches) throw new BadRequestException('Password is incorrect');

    const { access_token, refresh_token } = await this.sharedService.getTokens(
      user.id,
      email,
    );

    // Update or Add refresh_token field
    await this.sharedService.updateRefreshToken(user.id, refresh_token);

    const userPayload: ITokenPayload = {
      id: user.id,
      email,
      role: user.role,
    };

    return {
      ...userPayload,
      access_token,
      refresh_token,
    };
  }

  /****************************
   * Get Profile
   */
  async getProfileById(userId: number): Promise<IUser> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user)
      throw new NotFoundException(`User not found with id of ${userId}`);

    return user;
  }

  /****************************
   * Sign Out
   */
  async Logout(userId: number): Promise<IMessageResponse> {
    const user = await this.prismaService.user.updateMany({
      where: {
        id: userId,
        refresh_token: {
          not: null,
        },
      },
      data: {
        refresh_token: null,
        refresh_tooken_expire: null,
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
  ): Promise<IMessageResponse> {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new BadRequestException('User not found');

    const pwdMatches = await this.sharedService.compareData(
      currentPassword,
      user.password,
    );
    if (!pwdMatches)
      throw new BadRequestException(
        'The current password does not matche. Please entered a valid password.',
      );

    const hashPwd = await this.sharedService.hashData(newPassword);
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
  ): Promise<IUser> {
    const { first_name, last_name, phone, address, date_of_birth, email } =
      body;
    let uploadedResult: IImageUploadResponse;

    const curUser = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    if (!curUser) {
      // Remove image from the temporary path
      await fsExtra.remove(file.path);
      throw new BadRequestException(`User not found`);
    }

    // Make sure user is attach a file
    if (file) {
      if (curUser?.image_id || curUser?.image_url) {
        await this.cloudinaryService.removeImage(curUser.image_id);
      }

      uploadedResult = await this.cloudinaryService.uploadImage(file);

      // Remove image from the temporary path
      await fsExtra.remove(file.path);
    }

    // Update user
    const newUser: IUser = await this.prismaService.user.update({
      where: { id: userId },
      data: {
        first_name: first_name ? first_name : curUser.first_name,
        last_name: last_name ? last_name : curUser.last_name,
        email: email ? email : curUser.email,
        phone: phone ? phone : curUser.phone,
        address: address ? address : curUser.address,
        date_of_birth: date_of_birth
          ? new Date(date_of_birth)
          : curUser.date_of_birth,
        image_id: uploadedResult?.public_id
          ? uploadedResult.public_id
          : curUser.image_id,
        image_url: uploadedResult?.secure_url
          ? uploadedResult.secure_url
          : curUser.image_url,
      },
    });

    if (!newUser) throw new BadRequestException('User not found');

    return newUser;
  }

  /****************************
   * Remove account
   */
  async removeAccount(userId: number): Promise<IMessageResponse> {
    const delResponse = await this.prismaService.user.delete({
      where: { id: userId },
    });

    if (!delResponse)
      throw new NotFoundException(`User not found with id of ${userId}`);

    if (delResponse.image_id || delResponse.image_url) {
      await this.cloudinaryService.removeImage(delResponse.image_id);
    }

    // const transaction = await this.prismaService.$transaction([
    //   delProfileImg,
    //   delUser,
    // ]);

    return { message: 'Account removed is successfully' };
  }

  /*********************************************
   * Reuest the new access token by refresh token
   */
  async getAccessToken(userId: number, refreshToken: string): Promise<ITokens> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user || !user.refresh_token) {
      throw new UnauthorizedException(
        'Not authorized to get the new access token or token is expire',
      );
    }

    const refreshTokenMatches = await this.sharedService.compareData(
      refreshToken,
      user.refresh_token,
    );

    if (!refreshTokenMatches) {
      throw new UnauthorizedException(`Not authorized or token is expired`);
    }

    await this.sharedService.updateRefreshToken(userId, refreshToken);
    const { access_token, refresh_token } = await this.sharedService.getTokens(
      userId,
      user.email,
    );

    return {
      access_token,
      refresh_token,
    };
  }
}
