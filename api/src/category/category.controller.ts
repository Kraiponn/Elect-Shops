import { AccessTokenGuard } from './../auth/guards/access-token.guard';
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
import { CategoryService } from './category.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  /********************************
   * desc      Create category
   * route     Post /api/categories
   * access    Private(Role) - ADMIN
   */
  @UseGuards(AccessTokenGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createCategory(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    return this.categoryService.createdCategory(body, file);
  }

  /********************************
   * desc      Update category
   * route     Put /api/categories/:categoryId
   * access    Private(Role) - ADMIN
   */
  @UseGuards(AccessTokenGuard)
  @Put('/:categoryId')
  @UseInterceptors(FileInterceptor('image'))
  updateCategory(
    @Param('categoryId') categoryId: number,
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.categoryService.updatedCategory(Number(categoryId), body, file);
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
