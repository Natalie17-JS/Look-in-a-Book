/*
  Warnings:

  - The primary key for the `Chapter` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_chapterId_fkey";

-- AlterTable
ALTER TABLE "Chapter" DROP CONSTRAINT "Chapter_pkey",
ADD COLUMN     "publishStatus" "PStatus" NOT NULL DEFAULT 'DRAFT',
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Chapter_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Chapter_id_seq";

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "chapterId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "publishStatus" "PStatus" NOT NULL DEFAULT 'DRAFT';

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
