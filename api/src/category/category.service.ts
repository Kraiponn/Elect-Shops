import { Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  /***********************************
   * Create category
   */
  async createdCategory(body: any, file: Express.Multer.File): Promise<any> {
    return null;
  }

  /***********************************
   * Update category
   */
  async updatedCategory(
    categoryId: number,
    body: any,
    file: Express.Multer.File,
  ): Promise<any> {
    return null;
  }

  /***********************************
   * Remove category
   */
  async deletedCategory(categoryId: number): Promise<any> {
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
