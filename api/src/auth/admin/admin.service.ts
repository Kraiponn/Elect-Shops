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
import { ITokens, IUser } from '../interfaces';
import { SharesService } from '../shares/shares.service';

import * as fsExtra from 'fs-extra';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import {
  IImageUploadResponse,
  IMessageResponse,
  IPaginate,
} from 'src/features/interfaces';

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
  async getUserById(userId: number): Promise<IUser> {
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
   * Get Profile with user id
   */
  async getUsers(
    page: number,
    limit: number,
  ): Promise<{ paginate: IPaginate; users: IUser[] }> {
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
    const paginate: IPaginate = {
      total,
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

    for (let index = 0; index < users.length; index++) {
      delete users[index].password;
    }

    return { paginate, users };
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
  async updatedPassword(userId: number, password: string): Promise<IUser> {
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

    return user;
  }

  /****************************
   * Update Profile
   */
  async updatedProfile(
    userId: number,
    body: UpdatedProfileDto,
    file: Express.Multer.File,
  ): Promise<IUser> {
    const {
      email,
      first_name,
      last_name,
      phone,
      address,
      date_of_birth,
      image_id,
      image_url,
    } = body;
    let uploadedResult: IImageUploadResponse;

    const curUser = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    if (!curUser) {
      // Remove image from the temporary path
      await fsExtra.remove(file.path);
      throw new BadRequestException(`User not found`);
    }

    if (file) {
      if (curUser?.image_id || curUser?.image_url) {
        await this.cloudinaryService.removeImage(curUser.image_id);
      }

      uploadedResult = await this.cloudinaryService.uploadImage(file);

      // Remove image from the temporary path
      await fsExtra.remove(file.path);
    }

    const user = await this.prismaService.user.update({
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
        image_id: image_id ? image_id : uploadedResult.public_id,
        image_url: image_url ? image_url : uploadedResult.secure_url,
      },
    });

    if (!user) throw new BadRequestException('User not found');

    return user;
  }

  /****************************
   * Remove account
   */
  async removeAccount(
    userId: number,
  ): Promise<IMessageResponse & { user: IUser }> {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    const delResult = await this.prismaService.user.delete({
      where: { id: userId },
    });

    await this.cloudinaryService.removeImage(user.image_id);

    return { message: 'Account removed is successfully', user: delResult };
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

    if (!user || !user.refresh_token) {
      throw new UnauthorizedException(
        'Not authorization to get the new access token or token is expire',
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
