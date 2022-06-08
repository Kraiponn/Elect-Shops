import { AccessTokenGuard } from './../guards/access-token.guard';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthDto, UpdatedProfileDto } from '../dto';
import { UserIdFromJwt } from '../decorators';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth/admin/user')
export class AdminController {
  constructor(private adminService: AdminService) {}

  /**********************************
   * Get users
   */
  @UseGuards(AccessTokenGuard)
  @Get()
  getUsers(@Query('page') page: number, @Query('limit') limit: number) {
    return this.adminService.getUsers(Number(page), Number(limit));
  }

  /********************************
   * desc      Create new member
   * route     Post /api/auth/admin/add-member
   * access    Private
   */
  @UseGuards(AccessTokenGuard)
  @Post('/add-member')
  @HttpCode(HttpStatus.CREATED)
  async addMember(@Body() body: AuthDto) {
    return this.adminService.addUser(body);
  }

  /********************************
   * desc      Change password
   * route     Post /api/auth/admin/update-password
   * access    Private
   */
  @UseGuards(AccessTokenGuard)
  @Post('/add-member')
  @HttpCode(HttpStatus.OK)
  async updatedPassword(
    @UserIdFromJwt() userId: number,
    @Body('password') password: string,
  ) {
    return this.adminService.updatedPassword(userId, password);
  }

  /********************************
   * desc      Update profile
   * route     Post /api/auth/admin/update-profile
   * access    Private
   */
  @UseGuards(AccessTokenGuard)
  @Post('update-profile')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('image'))
  updatedProfile(
    @UserIdFromJwt() userId: number,
    @Body() body: UpdatedProfileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.adminService.updatedProfile(userId, body, file);
  }
}
