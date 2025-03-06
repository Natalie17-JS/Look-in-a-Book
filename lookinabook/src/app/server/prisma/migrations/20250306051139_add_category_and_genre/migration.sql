/*
  Warnings:

  - Added the required column `category` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genre` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('FICTION', 'NON_FICTION');

-- CreateEnum
CREATE TYPE "Genre" AS ENUM ('DRAMA', 'ADVENTURE', 'SCIENCE_FICTION', 'POST_APOCALYPSE', 'APOCALYPSE', 'HUMOR', 'HISTORY', 'SHORT_STORY', 'POETRY', 'DETECTIVE', 'THRILLER');

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "category" "Category" NOT NULL,
ADD COLUMN     "genre" "Genre" NOT NULL;
