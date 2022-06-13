/*
  Warnings:

  - Made the column `productId` on table `product_images` required. This step will fail if there are existing NULL values in that column.
  - Made the column `categoryId` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `profile_image` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "product_images" DROP CONSTRAINT "product_images_productId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "profile_image" DROP CONSTRAINT "profile_image_userId_fkey";

-- DropIndex
DROP INDEX "orders_productId_key";

-- DropIndex
DROP INDEX "orders_uesrId_key";

-- AlterTable
ALTER TABLE "product_images" ALTER COLUMN "productId" SET NOT NULL;

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "categoryId" SET NOT NULL;

-- AlterTable
ALTER TABLE "profile_image" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "profile_image" ADD CONSTRAINT "profile_image_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
