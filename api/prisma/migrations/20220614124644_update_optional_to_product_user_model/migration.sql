-- AlterTable
ALTER TABLE "products" ALTER COLUMN "image_id" DROP NOT NULL,
ALTER COLUMN "image_url" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "image_id" DROP NOT NULL,
ALTER COLUMN "image_url" DROP NOT NULL;
