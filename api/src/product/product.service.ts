import { Injectable } from '@nestjs/common';

import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  /***********************************
   * Create category
   */
  async createdProduct(body: any): Promise<any> {
    return {};
  }

  /***********************************
   * Update category
   */
  async updatedProduct(productId: number, body: any): Promise<any> {
    return {};
  }

  /***********************************
   * Remove category
   */
  async deletedProduct(productId: number): Promise<any> {
    return {};
  }
}
