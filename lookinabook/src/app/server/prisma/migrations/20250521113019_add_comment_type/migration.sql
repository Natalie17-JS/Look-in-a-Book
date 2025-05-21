/*
  Warnings:

  - Added the required column `commentType` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CommentType" AS ENUM ('BOOKCOMMENT', 'POSTCOMMENT', 'CHAPTERCOMMENT', 'REPLYCOMMENT');

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "commentType" "CommentType" NOT NULL;
