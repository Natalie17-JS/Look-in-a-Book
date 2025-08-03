-- DropForeignKey
ALTER TABLE "ChatInvite" DROP CONSTRAINT "ChatInvite_chatId_fkey";

-- DropForeignKey
ALTER TABLE "ChatParticipant" DROP CONSTRAINT "ChatParticipant_chatId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_chatId_fkey";

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "replyToId" INTEGER;

-- AddForeignKey
ALTER TABLE "ChatParticipant" ADD CONSTRAINT "ChatParticipant_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatInvite" ADD CONSTRAINT "ChatInvite_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_replyToId_fkey" FOREIGN KEY ("replyToId") REFERENCES "Message"("id") ON DELETE SET NULL ON UPDATE CASCADE;
