import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { AccessTokenGuard } from './../auth/guards/access-token.guard';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto';
import { AdminRoleInterceptor } from 'src/auth/interceptors';

/***************************************************************
 *  All routes must be an Admin role(UserType)1
 */

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  /**********************************************************
   * desc      Get categories for hot navigation
   * route     Get /v2/api/categories/hot-menu
   * access    Public
   */
  @Get('/hot-menu')
  getCategoriesMenu() {
    return this.categoryService.getHotCategoriesNavigation();
  }

  /********************************
   * desc      Create category
   * route     Post /v2/api/categories
   * access    Private(Role) - ADMIN
   */
  @UseInterceptors(AdminRoleInterceptor)
  @UseGuards(AccessTokenGuard)
  @Post()
  async createCategory(@Body() body: CategoryDto) {
    return await this.categoryService.createdCategory(body);
  }

  /********************************
   * desc      Update category
   * route     Put /v2/api/categories/:categoryId
   * access    Private(Role) - ADMIN
   */
  @UseInterceptors(AdminRoleInterceptor)
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
   * route     Delete /v2/api/categories/:categoryId
   * access    Private(Role) - ADMIN
   */
  @UseInterceptors(AdminRoleInterceptor)
  @UseGuards(AccessTokenGuard)
  @Delete('/:categoryId')
  deleteCategory(@Param('categoryId') categoryId: number) {
    return this.categoryService.deletedCategory(Number(categoryId));
  }

  /********************************
   * desc      Get category by id
   * route     Get /v2/api/categories/:categoryId
   * access    Public
   */
  @Get('/:categoryId')
  getCategoryById(@Param('categoryId') categoryId: number) {
    return this.categoryService.getCategoryById(Number(categoryId));
  }

  /************************************************************************************
   * desc      Get many categories with pagination
   * route     Get /v2/api/categories?page=xx&limit=xx&noPrefixZeroIndex=[boolean]
   * access    Public
   */
  @Get()
  getCategories(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('noPrefixZeroIndex') noPrefixZeroIndex: boolean,
    @Query('search') search: string,
  ) {
    return this.categoryService.getCategories(
      Number(page),
      Number(limit),
      Boolean(noPrefixZeroIndex),
      search,
    );
  }
}
