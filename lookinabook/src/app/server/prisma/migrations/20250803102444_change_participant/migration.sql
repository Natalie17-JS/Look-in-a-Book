-- DropForeignKey
ALTER TABLE "ChatInvite" DROP CONSTRAINT "ChatInvite_inviterId_fkey";

-- AddForeignKey
ALTER TABLE "ChatInvite" ADD CONSTRAINT "ChatInvite_inviterId_fkey" FOREIGN KEY ("inviterId") REFERENCES "ChatParticipant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
