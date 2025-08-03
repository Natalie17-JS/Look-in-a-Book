import { getUserFromRequest } from "../../auth/authMiddleware";
import { DateTime } from "../resolversTypes/dateTime";
import { LetterResolversTypes } from "../resolversTypes/letterResolversTypes";

const letterResolvers: LetterResolversTypes = {
DateTime,
Query: {
 getLetterById: async (_, { id }, { req, res, prisma }) => {
      try {
         const user = await getUserFromRequest(req, res);
                if (!user) {
                  throw new Error("Not authenticated");
                }
        const letter = await prisma.letter.findUnique({ 
          where: { id } , 
          include: {
      sender: true,
      replies: true
          }
    });
        if (!letter) throw new Error("Letter not found");
        return letter;
      } catch (error) {
        console.error("Error getting letter:", error);
        throw new Error("Failed to retrieve letter.");
      }
    },

    getUserReadLetters: async (_,__, { req, res, prisma }) => {
   try {
        const user = await getUserFromRequest(req, res);
                if (!user) {
                  throw new Error("Not authenticated");
                }
        const readLetters = await prisma.letter.findMany({
          where: {
      recipientId: user.id,
       isRead: true,
    },
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      sender: true,
      replies: true
    }
        });
        return readLetters;
      } catch (error) {
        console.error("Error fetching user letters:", error);
        throw new Error("Failed to fetch user letters.");
      }
},

   getUserUnreadLetters: async (_,__, { req, res, prisma }) => {
   try {
        const user = await getUserFromRequest(req, res);
                if (!user) {
                  throw new Error("Not authenticated");
                }
        const readLetters = await prisma.letter.findMany({
          where: {
      recipientId: user.id,
       isRead: false,
    },
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      sender: true,
      replies: true
    }
        });
        return readLetters;
      } catch (error) {
        console.error("Error fetching user letters:", error);
        throw new Error("Failed to fetch user letters.");
      }
},

getUserSentLetters: async (_, __, { req, res, prisma }) => {
  try {
    const user = await getUserFromRequest(req, res);
    if (!user) {
      throw new Error("Not authenticated");
    }

    const sentLetters = await prisma.letter.findMany({
      where: {
        senderId: user.id,
      },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        recipient: true,  // Важно — recipient!
        replies: true
      }
    });

    return sentLetters;
  } catch (error) {
    console.error("Error fetching sent letters:", error);
    throw new Error("Failed to fetch sent letters.");
  }
},


    countUnreadLetters: async (_,__, { req, res, prisma }) => {
  const user = await getUserFromRequest(req, res);
  if (!user) throw new Error("Not authenticated");

  const count = await prisma.letter.count({
    where: {
      recipientId: user.id,
      isRead: false,

    },
  });

  return count;
},

},

Mutation:{
createLetter: async (_, { text, recipientId, replyToId }, { req, res, prisma }) => {
  try {
    const user = await getUserFromRequest(req, res);
    if (!user) throw new Error("Not authenticated");

    if (user.id === recipientId) {
      throw new Error("Cannot send a letter to yourself.");
    }

    const letter = await prisma.letter.create({
      data: {
        text,
        senderId: user.id,
        recipientId,
        isRead: false,
        replyToId: replyToId ?? null,
      },
    });

    return letter;
  } catch (error) {
    console.error("Error creating letter:", error);
    throw new Error("Failed to send letter.");
  }
},



    replyToLetter: async (_, { text, replyToId }, { req, res, prisma }) => {
  const user = await getUserFromRequest(req, res);
  if (!user) throw new Error("Not authenticated");

  const original = await prisma.letter.findUnique({
    where: { id: replyToId },
    include: { replies: true }
  });

  if (!original) {
    throw new Error("Original letter not found or is not a letter");
  }

  if (original.recipientId !== user.id) {
    throw new Error("You can reply only to letters sent to you");
  }

  if (original.replies.length > 0) {
    throw new Error("You already replied to this letter");
  }

  const reply = await prisma.letter.create({
    data: {
      text,
      senderId: user.id,
      recipientId: original.senderId,
      replyToId: replyToId
    },
  });

  return reply;
},

markLetterAsRead: async (_, { id }, { req, res, prisma }) => {
  try {
    const user = await getUserFromRequest(req, res);
    if (!user) throw new Error("Not authenticated");

    const letter = await prisma.letter.findUnique({ where: { id } });
    if (!letter) throw new Error("Letter not found");

    // Убедись, что только получатель может прочитать сообщение
    if (letter.recipientId !== user.id) {
      throw new Error("You are not authorized to read this letter");
    }

    if (letter.isRead) return letter; // уже прочитано

    const updated = await prisma.letter.update({
      where: { id },
      data: { isRead: true },
    });

    return updated;
  } catch (error) {
    console.error("Error marking letter as read:", error);
    throw new Error("Failed to mark letter as read");
  }
},
deleteLetter: async (_, { id },{ req, res, prisma } ) => {
      try {
         const user = await getUserFromRequest(req, res);
                if (!user) {
                  throw new Error("Not authenticated");
                }
                 const letter = await prisma.letter.findUnique({ where: { id } });
          
              if (!letter) {
                throw new Error("Letter not found");
              }

        const deletedLetter = await prisma.letter.delete({ where: { id } });
       return { message: "Letter was successfully deleted" };
      } catch (error) {
        console.error("Error deleting letter:", error);
        throw new Error("Failed to delete letter.");
      }
    },
}
}

export default letterResolvers;