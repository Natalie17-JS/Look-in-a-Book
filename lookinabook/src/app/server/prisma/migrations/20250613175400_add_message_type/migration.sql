-- CreateEnum
CREATE TYPE "MessageType" AS ENUM ('LETTER', 'MESSAGE');

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "type" "MessageType" NOT NULL DEFAULT 'MESSAGE';
