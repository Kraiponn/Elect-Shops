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
import { FileInterceptor } from '@nestjs/platform-express';

import { AccessTokenGuard } from 'src/auth/guards';
import { AdminRoleInterceptor } from 'src/auth/interceptors';
import { ProductDto } from './dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  /********************************
   * desc      Create product
   * route     Post /v2/api/products/:categoryId
   * access    Private(Role) - ADMIN
   */
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(AdminRoleInterceptor)
  @UseInterceptors(FileInterceptor('image'))
  @Post('/:categoryId')
  createProduct(
    @Param('categoryId') categoryId: number,
    @Body() body: ProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.productService.createdProduct(Number(categoryId), body, file);
  }

  /********************************
   * desc      Update product
   * route     Put /v2/api/products/:productId
   * access    Private(Role) - ADMIN
   */
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(AdminRoleInterceptor)
  @UseInterceptors(FileInterceptor('image'))
  @Put('/:productId')
  updatedProduct(
    @Param('productId') productId: number,
    @Body() body: ProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.productService.updatedProduct(Number(productId), body, file);
  }

  /********************************
   * desc      Delete product by id
   * route     Delete /v2/api/products/:productId
   * access    Private(Role) - ADMIN
   */
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(AdminRoleInterceptor)
  @Delete('/:productId')
  deletedProduct(@Param('productId') productId: number) {
    return this.productService.deletedProduct(Number(productId));
  }

  /********************************
   * desc      Get product by id
   * route     Get /v2/api/products/:productId
   * access    Public(Role) - ADMIN OR USER
   */
  @UseGuards(AccessTokenGuard)
  @Get('/:productId')
  getProductById(@Param('productId') productId: number) {
    return this.productService.getProductById(Number(productId));
  }

  /********************************
   * desc      Get many products with pagination
   * route     Get /v2/api/products?page=xx&limit=xx
   * access    Public(Role) - ADMIN or USER
   */
  @UseGuards(AccessTokenGuard)
  @Get()
  getProducts(@Query('page') page: number, @Query('limit') limit: number) {
    return this.productService.getProducts(Number(page), Number(limit));
  }
}
