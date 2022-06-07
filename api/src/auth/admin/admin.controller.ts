import { AccessTokenGuard } from './../guards/access-token.guard';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';

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
}
