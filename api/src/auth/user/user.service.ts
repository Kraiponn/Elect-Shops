import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { AuthDto, UpdatedProfileDto, UserUpdatedPwdDto } from '../dto';
import { IProfileImage, ITokens, IUser, IUserResponse } from '../interfaces';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { SharesService } from '../shares/shares.service';
import * as fsExtra from 'fs-extra';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly sharedService: SharesService,
  ) {}

  ///////////////////////// Request Mehod /////////////////////////////////
  /****************************
   * Sign Up
   */
  async signup({ email, password }: AuthDto): Promise<IUserResponse & ITokens> {
    const pwdHash = await this.sharedService.hashData(password);

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

      const { access_token, refresh_token } =
        await this.sharedService.getTokens(user.id, email);

      await this.sharedService.updateRefreshToken(user.id, refresh_token);

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
  async getProfile(userId: number): Promise<IUserResponse> {
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
  ): Promise<{ message: string }> {
    const { firstName, lastName, phone, address, dateOfBirth, email } = body;
    let uploadedResult: IProfileImage;

    const curUser = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    if (!curUser) {
      // Remove image from the temporary path
      await fsExtra.remove(file.path);
      throw new BadRequestException(`User not found`);
    }

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
        firstName: firstName ? firstName : curUser.firstName,
        lastName: lastName ? lastName : curUser.lastName,
        email: email ? email : curUser.email,
        phone: phone ? phone : curUser.phone,
        address: address ? address : curUser.address,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : curUser.dateOfBirth,
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

  /****************************
   * Remove account
   */
  async removeAccount(userId: number): Promise<{ message: string }> {
    const profileImg = await this.prismaService.profileImage.findUnique({
      where: { userId },
    });

    if (!profileImg)
      throw new NotFoundException(`User not found with id of ${userId}`);

    if (profileImg.public_id || profileImg.secure_url) {
      await this.cloudinaryService.removeImage(profileImg.public_id);
    }

    await this.prismaService.profileImage.delete({
      where: {
        userId,
      },
    });

    await this.prismaService.user.delete({
      where: { id: userId },
    });

    // const transaction = await this.prismaService.$transaction([
    //   delProfileImg,
    //   delUser,
    // ]);

    return { message: 'Account removed is successfully' };
  }

  /*********************************************
   * Reuest new access token by refresh token
   */
  async getAccessToken(userId: number, refreshToken: string): Promise<ITokens> {
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

    const refreshTokenMatches = await this.sharedService.compareData(
      refreshToken,
      user.refreshToken,
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
