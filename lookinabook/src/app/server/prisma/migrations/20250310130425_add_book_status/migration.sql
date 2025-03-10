-- CreateEnum
CREATE TYPE "PStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- CreateEnum
CREATE TYPE "WStatus" AS ENUM ('ONGOING', 'COMPLETED');

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "publishStatus" "PStatus" NOT NULL DEFAULT 'DRAFT',
ADD COLUMN     "writingStatus" "WStatus" NOT NULL DEFAULT 'ONGOING';
