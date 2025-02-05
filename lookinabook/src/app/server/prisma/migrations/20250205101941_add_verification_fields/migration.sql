-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastVerificationRequest" TIMESTAMP(3),
ADD COLUMN     "verificationAttempts" INTEGER NOT NULL DEFAULT 0;
