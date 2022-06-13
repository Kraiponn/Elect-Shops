import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Product } from '@prisma/client';

import * as fxExtra from 'fs-extra';

import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { IImageObjResult } from 'src/features/interfaces';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductDto } from './dto';
import { ICreatedProductResponse, IProduct } from './interfaces';

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
    categoryId: number,
    { productName, description, inStock, unitPrice }: ProductDto,
    file: Express.Multer.File,
  ): Promise<ICreatedProductResponse> {
    let imgUploadResult: IImageObjResult;
    let product: IProduct;

    try {
      if (file) {
        imgUploadResult = await this.cloudinaryService.uploadImage(file);

        // Remove tempt file from uploads path
        await fxExtra.remove(file.path);
      }

      product = await this.prismaService.product.create({
        data: {
          productName,
          description: description ? description : '',
          inStock: Number(inStock),
          unitPrice: Number(unitPrice),
          categoryId,
          productImage: {
            create: {
              public_id: imgUploadResult.public_id,
              secure_url: imgUploadResult.secure_url,
            },
          },
        },
      });

      return {
        message: 'Product created is successfully',
        product,
      };
    } catch (error) {
      // Remove tempt file from uploads path
      await fxExtra.remove(file.path);
      await this.cloudinaryService.removeImage(imgUploadResult.public_id);

      throw new InternalServerErrorException();
    }
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
