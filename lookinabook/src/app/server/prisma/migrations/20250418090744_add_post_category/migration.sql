-- CreateEnum
CREATE TYPE "PostCategory" AS ENUM ('THOUGHTS', 'NEWS', 'NEW_BOOK_PROMOTION', 'OTHER');

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "category" "PostCategory" NOT NULL DEFAULT 'OTHER';
