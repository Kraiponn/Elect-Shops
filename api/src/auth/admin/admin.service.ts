import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, UpdatedProfileDto } from '../dto';
import {
  ITokens,
  IUserResponse,
  IUser,
  IProfileImage,
  IPaginateResponse,
} from '../interfaces';
import { SharesService } from '../shares/shares.service';

import * as fsExtra from 'fs-extra';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class AdminService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly sharedService: SharesService,
  ) {}

  /****************************
   * Create new member
   */
  async addUser({ email, password }: AuthDto): Promise<IUser> {
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

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('This email alread exists');
        }
      }
    }
  }

  /****************************
   * Get Profile with user id
   */
  async getUserById(userId: number): Promise<IUserResponse> {
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
   * Get Profile with user id
   */
  async getUsers(
    page: number,
    limit: number,
  ): Promise<{ paginate: IPaginateResponse; users: IUser[] }> {
    const startIndex = (page - 1) * limit;
    const lastIndex = page * limit;

    const total = await this.prismaService.user.count();
    const users = await this.prismaService.user.findMany({
      skip: startIndex,
      take: limit,
      orderBy: {
        id: 'asc',
      },
    });

    // Paginate
    const paginate: IPaginateResponse = {
      count: total,
      current: page,
      next: {
        page: 0,
        limit,
      },
      prev: {
        page: 0,
        limit,
      },
    };

    if (lastIndex < total) {
      paginate.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      paginate.prev = {
        page: page - 1,
        limit,
      };
    }

    // console.log(users);
    for (let index = 0; index < users.length; index++) {
      delete users[index].password;
    }

    return { paginate, users };
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
    password: string,
  ): Promise<{ message: string }> {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    if (!user)
      throw new BadRequestException(`There is no user with id of ${userId}`);

    const hashPwd = await this.sharedService.hashData(password);
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
    const { email, firstName, lastName, phone, address, dateOfBirth } = body;
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

    return { message: 'Profile update is successfully' };
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

    await this.prismaService.profileImage.delete({
      where: {
        userId,
      },
    });

    if (profileImg.public_id || profileImg.secure_url) {
      await this.cloudinaryService.removeImage(profileImg.public_id);
    }

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
