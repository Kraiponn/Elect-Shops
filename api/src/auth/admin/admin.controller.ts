import { AccessTokenGuard } from './../guards/access-token.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthDto, UpdatedProfileDto } from '../dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminRoleInterceptor } from '../interceptors';

/***************************************************************
 *  All routes must be an Admin role(UserType)
 */
@UseInterceptors(AdminRoleInterceptor)
@Controller('auth/admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  /********************************
   * desc      Query users with pagination pattern
   * route     Post /api/auth/admin?page=xx&limit=xx
   * access    Private
   */
  @UseGuards(AccessTokenGuard)
  @Get()
  getUsers(@Query('page') page: number, @Query('limit') limit: number) {
    return this.adminService.getUsers(Number(page), Number(limit));
  }

  /********************************
   * desc      Get profile
   * route     Post /api/auth/admin/:userId
   * access    Private
   */
  @UseGuards(AccessTokenGuard)
  @Get('/:userId')
  @HttpCode(HttpStatus.OK)
  getProfile(@Param('userId') userId: number) {
    return this.adminService.getUserById(Number(userId));
  }

  /********************************
   * desc      Create new member
   * route     Post /api/auth/admin/add-user
   * access    Private
   */
  @UseGuards(AccessTokenGuard)
  @Post('/add-user')
  @HttpCode(HttpStatus.CREATED)
  async addMember(@Body() body: AuthDto) {
    return this.adminService.addUser(body);
  }

  /********************************
   * desc      Change password
   * route     Post /api/auth/admin/update-password/:userId
   * access    Private
   */
  @UseGuards(AccessTokenGuard)
  @Post('/update-password/:userId')
  @HttpCode(HttpStatus.OK)
  async updatedPassword(
    @Param('userId') userId: number,
    @Body('password') password: string,
  ) {
    return this.adminService.updatedPassword(Number(userId), password);
  }

  /********************************
   * desc      Update profile
   * route     Post /api/auth/admin/update-profile/:userId
   * access    Private
   */
  @UseGuards(AccessTokenGuard)
  @Post('update-profile/:userId')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('image'))
  updatedProfile(
    @Param('userId') userId: number,
    @Body() body: UpdatedProfileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.adminService.updatedProfile(Number(userId), body, file);
  }

  /********************************
   * desc      Remove account
   * route     Delete /api/auth/admin/:userId
   * access    Private
   */
  @UseGuards(AccessTokenGuard)
  @Delete('/:userId')
  @HttpCode(HttpStatus.OK)
  deletAccount(@Param('userId') userId: number) {
    return this.adminService.removeAccount(Number(userId));
  }
}
