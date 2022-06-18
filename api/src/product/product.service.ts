import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import * as fxExtra from 'fs-extra';

import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { IImageUploadResponse, IPaginate } from 'src/features/interfaces';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductCreateDto, ProductUpdateDto } from './dto';
import { IProductResponse, IProduct } from './interfaces';

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
    { product_name, description, in_stock, unit_price }: ProductCreateDto,
    file: Express.Multer.File,
  ): Promise<IProductResponse> {
    let imgUploadResult: IImageUploadResponse = {
      public_id: '',
      secure_url: '',
    };
    let product: IProduct;

    try {
      if (file) {
        imgUploadResult = await this.cloudinaryService.uploadImage(file);

        // Remove tempt file from uploads path
        await fxExtra.remove(file.path);
      }

      const { public_id, secure_url } = imgUploadResult;

      product = await this.prismaService.product.create({
        data: {
          product_name: product_name ? product_name : '',
          description: description ? description : '',
          in_stock: in_stock ? Number(in_stock) : 0,
          unit_price: unit_price ? Number(unit_price) : 0,
          category_id: categoryId,
          image_id: public_id ? public_id : '',
          image_url: secure_url ? secure_url : '',
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
    body: ProductUpdateDto,
    file: Express.Multer.File,
  ): Promise<IProductResponse> {
    const { product_name, description, unit_price, in_stock, category_id } =
      body;
    let uploadResult: IImageUploadResponse = {
      public_id: '',
      secure_url: '',
    };

    const curProduct = await this.prismaService.product.findUnique({
      where: { id: productId },
    });

    if (file) {
      try {
        // Removing old image from cloud
        await this.cloudinaryService.removeImage(curProduct.image_id);

        // Update new image to cloud
        uploadResult = await this.cloudinaryService.uploadImage(file);

        // Remove tempt file from uploads path
        await fxExtra.remove(file.path);
      } catch (error) {
        // Update new image to cloud
        // uploadResult = await this.cloudinaryService.uploadImage(file);
      }
    }

    const { public_id, secure_url } = uploadResult;

    const newProduct = await this.prismaService.product.update({
      where: { id: productId },
      data: {
        product_name: product_name ? product_name : curProduct.product_name,
        description: description ? description : curProduct.description,
        in_stock: in_stock ? in_stock : curProduct.in_stock,
        unit_price: unit_price ? unit_price : curProduct.unit_price,
        image_id: public_id ? public_id : curProduct.image_id,
        image_url: secure_url ? secure_url : curProduct.image_url,
        category_id: category_id ? category_id : curProduct.category_id,
      },
    });

    return {
      message: 'Product updated is successfully',
      product: newProduct,
    };
  }

  /***********************************
   * Remove category
   */
  async deletedProduct(productId: number): Promise<IProductResponse> {
    const productExists = await this.prismaService.product.findUnique({
      where: { id: productId },
    });

    if (!productExists)
      throw new NotFoundException(
        `There is no product with id of ${productId}`,
      );

    // Removing image form cloud
    await this.cloudinaryService.removeImage(productExists.image_id);

    const product = await this.prismaService.product.delete({
      where: { id: productId },
    });

    return {
      message: 'Product deleted is successfully',
      product,
    };
  }

  /***********************************
   * Get product with product Id
   */
  async getProductById(productId: number): Promise<IProduct> {
    const product = await this.prismaService.product.findUnique({
      where: { id: productId },
    });

    if (!product)
      throw new NotFoundException(`Product not found with id of ${productId}`);

    return product;
  }

  /***************************************
   * Get many products with pagination
   */
  async getProducts(
    page: number,
    limit: number,
  ): Promise<IPaginate & { products: IProduct[] }> {
    const startIndex = (page - 1) * limit;
    const lastIndex = page * limit;

    const total = await this.prismaService.product.count();
    const products = await this.prismaService.product.findMany({
      take: limit,
      skip: startIndex,
      orderBy: {
        id: 'asc',
      },
    });

    const pagination: IPaginate = {
      total,
      current: page,
      next: {
        page: 0,
        limit,
      },
      prev: {
        page: 0,
        limit,
      },
    };

    if (lastIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    return {
      ...pagination,
      products,
    };
  }
}
