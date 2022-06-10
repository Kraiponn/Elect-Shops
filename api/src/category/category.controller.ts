import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AccessTokenGuard } from './../auth/guards/access-token.guard';
import { CategoryService } from './category.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CategoryDto } from './dto';
import { Roles } from 'src/auth/decorators';
import { UserType } from '@prisma/client';
import { RolesGuard } from 'src/auth/guards';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  /********************************
   * desc      Create category
   * route     Post /api/categories
   * access    Private(Role) - ADMIN
   */
  @UseGuards(AccessTokenGuard)
  @Post()
  @Roles(UserType.ADMIN)
  @UseGuards(RolesGuard)
  createCategory(@Body() body: CategoryDto) {
    return this.categoryService.createdCategory(body);
  }

  /********************************
   * desc      Update category
   * route     Put /api/categories/:categoryId
   * access    Private(Role) - ADMIN
   */
  @UseGuards(AccessTokenGuard)
  @Put('/:categoryId')
  updateCategory(
    @Param('categoryId') categoryId: number,
    @Body() body: CategoryDto,
  ) {
    return this.categoryService.updatedCategory(Number(categoryId), body);
  }

  /********************************
   * desc      Delete category by id
   * route     Delete /api/categories/:categoryId
   * access    Private(Role) - ADMIN
   */
  @UseGuards(AccessTokenGuard)
  @Delete('/:categoryId')
  deleteCategory(@Param('categoryId') categoryId: number) {
    return this.categoryService.deletedCategory(Number(categoryId));
  }

  /********************************
   * desc      Get category by id
   * route     Get /api/categories/:categoryId
   * access    Private(Role) - ADMIN
   */
  @UseGuards(AccessTokenGuard)
  @Get('/:categoryId')
  getCategoryById(@Param('categoryId') categoryId: number) {
    return this.categoryService.getCategoryById(Number(categoryId));
  }

  /********************************
   * desc      Get category by id
   * route     Get /api/categories/:categoryId
   * access    Private(Role) - ADMIN
   */
  @UseGuards(AccessTokenGuard)
  @Get()
  getCategories(@Query('page') page: number, @Query('limit') limit: number) {
    return this.categoryService.getCategories(Number(page), Number(limit));
  }
}
