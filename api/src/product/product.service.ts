import { Injectable } from '@nestjs/common';

import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductDto } from './dto';

@Injectable()
export class ProductService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  /***********************************
   * Create category
   */
  async createdProduct(
    body: ProductDto,
    file: Express.Multer.File,
  ): Promise<any> {
    return {};
  }

  /***********************************
   * Update category
   */
  async updatedProduct(
    productId: number,
    body: ProductDto,
    file: Express.Multer.File,
  ): Promise<any> {
    return {};
  }

  /***********************************
   * Remove category
   */
  async deletedProduct(productId: number): Promise<any> {
    return {};
  }

  /***********************************
   * Get product with product Id
   */
  async getProductById(productId: number): Promise<any> {
    const product = await this.prismaService.product.findUnique({
      where: { id: productId },
      //Nana Ninomiya
    });
    return {};
  }

  /***************************************
   * Get many products with pagination
   */
  async getProducts(page: number, limit: number): Promise<any> {
    return {};
  }
}
