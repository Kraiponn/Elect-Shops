import { Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
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
    // const delProducts = await this.prismaService.product.deleteMany({
    //   where: {
    //     AND: [
    //       { categoryId }
    //     ]
    //   }
    // })
    return null;
  }

  /***********************************
   * Get category by Id
   */
  async getCategoryById(categoryId: number): Promise<any> {
    return null;
  }

  /***************************************************
   * Query categories and response with pagination
   */
  async getCategories(page: number, limit: number): Promise<any> {
    return null;
  }
}
