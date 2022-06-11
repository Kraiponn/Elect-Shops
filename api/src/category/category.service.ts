import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from '@prisma/client';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { IPaginate } from 'src/features/interfaces';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryDto } from './dto';
import { ICreateCategoryResponse } from './interfaces';

@Injectable()
export class CategoryService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  /***********************************
   * Create category
   */
  async createdCategory({
    categoryName,
    description,
  }: CategoryDto): Promise<any> {
    const category = (await this.prismaService.category.create({
      data: {
        categoryName,
        description: description ? description : '',
      },
    })) as ICreateCategoryResponse;

    return category;
  }

  /***********************************
   * Update category
   */
  async updatedCategory(
    categoryId: number,
    { categoryName, description }: CategoryDto,
  ): Promise<any> {
    return await this.prismaService.category.update({
      where: {
        id: categoryId,
      },
      data: {
        categoryName,
        description,
      },
    });
  }

  /***********************************
   * Remove category
   */
  async deletedCategory(categoryId: number): Promise<any> {
    const product = await this.prismaService.product.findUnique({
      where: {
        categoryId,
      },
      select: {
        id: true,
        productImages: {
          select: { public_id: true },
        },
      },
    });

    if (product) {
      await this.prismaService.productImage.delete({
        where: { productId: product.id },
      });

      await this.cloudinaryService.removeImage(
        product.productImages[0].public_id,
      );

      await this.prismaService.product.deleteMany({
        where: { categoryId },
      });
    }

    return await this.prismaService.category.delete({
      where: { id: categoryId },
    });
  }

  /***********************************
   * Get category by Id
   */
  async getCategoryById(categoryId: number): Promise<any> {
    const category = await this.prismaService.category.findUnique({
      where: { id: categoryId },
    });

    if (!category)
      throw new NotFoundException(
        `There is no category with this id of ${categoryId}`,
      );

    return category;
  }

  /***************************************************
   * Query categories and response with pagination
   */
  async getCategories(
    page: number,
    limit: number,
  ): Promise<{ pagination: IPaginate; categories: Category[] }> {
    const startIndex = (page - 1) * limit;
    const lastIndex = page * limit;

    const total = await this.prismaService.category.count();
    const categories = await this.prismaService.category.findMany({
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
      pagination,
      categories,
    };
  }
}
