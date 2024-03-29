import { Injectable, NotFoundException } from '@nestjs/common';

import { Category } from '@prisma/client';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { IPaginate } from 'src/features/interfaces';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryDto } from './dto';
import { ICategory } from './interfaces';

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
    category_name,
    description,
  }: CategoryDto): Promise<ICategory> {
    const category = (await this.prismaService.category.create({
      data: {
        category_name,
        description: description ? description : '',
      },
    })) as ICategory;

    return category;
  }

  /***********************************
   * Update category
   */
  async updatedCategory(
    categoryId: number,
    { category_name, description }: CategoryDto,
  ): Promise<ICategory> {
    return await this.prismaService.category.update({
      where: {
        id: categoryId,
      },
      data: {
        category_name,
        description,
      },
    });
  }

  /***********************************
   * Remove category
   */
  async deletedCategory(categoryId: number): Promise<ICategory> {
    const products = await this.prismaService.product.findMany({
      where: {
        category_id: categoryId,
      },
    });

    if (products || products.length > 0) {
      if (products[0]?.image_id)
        await this.cloudinaryService.removeImage(products[0].image_id);

      await this.prismaService.product.deleteMany({
        where: { category_id: categoryId },
      });
    }

    if (
      !(await this.prismaService.category.findUnique({
        where: { id: categoryId },
      }))
    ) {
      throw new NotFoundException(
        `Category not found with id of ${categoryId}`,
      );
    }

    return await this.prismaService.category.delete({
      where: { id: categoryId },
    });
  }

  /***********************************
   * Get category by Id
   */
  async getCategoryById(categoryId: number): Promise<ICategory> {
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
   * Query categories for hot navagation
   */
  async getHotCategoriesNavigation(): Promise<any> {
    const categories = await this.prismaService.category.findMany({
      take: 7,
      include: {
        products: {
          take: 5,
        },
      },
    });

    return categories;
  }

  /***************************************************
   * Query categories and response with pagination
   */
  async getCategories(
    page: number,
    limit: number,
    noPrefixZeroIndex = true,
    search: string,
  ): Promise<{ pagination: IPaginate; categories: Category[] }> {
    const startIndex = (page - 1) * limit;
    const lastIndex = page * limit;

    // const total = await this.prismaService.category.count();
    let categories: Category[];
    let quantity = 0;

    if (search) {
      quantity = await this.prismaService.category.count({
        where: {
          category_name: {
            contains: search,
            mode: 'insensitive',
          },
        },
      });
      categories = await this.prismaService.category.findMany({
        where: {
          category_name: {
            contains: search,
            mode: 'insensitive',
          },
        },
        take: limit,
        skip: startIndex,
        orderBy: {
          id: 'asc',
        },
      });
    } else {
      quantity = await this.prismaService.category.count();
      categories = await this.prismaService.category.findMany({
        take: limit,
        skip: startIndex,
        orderBy: {
          id: 'asc',
        },
      });
    }

    // catQuantities = categories.length;
    const pagination: IPaginate = {
      total: quantity,
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

    if (lastIndex < quantity) {
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

    // Make for blank selection on client
    if (!noPrefixZeroIndex)
      categories.unshift({
        id: 0,
        category_name: 'All Products',
        description: 'Choose all categories',
        created_at: new Date(Date.now()),
        updated_at: new Date(Date.now()),
      });

    return {
      pagination,
      categories,
    };
  }
}
