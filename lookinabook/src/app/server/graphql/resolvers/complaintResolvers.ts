import { ComplaintResolvers } from "../resolversTypes/complaintResolversTypes";
import prisma from "@/app/server/prisma/prismaClient";

// Функция для создания уведомления администратору
const createComplaintNotification = async (complaint: {
    reason: string;
    reportedUser: number;
  }) => {
    await prisma.notification.create({
      data: {
        type: "COMPLAINT", // Тип уведомления
        content: `New complaint filed: ${complaint.reason} against user ${complaint.reportedUser}`,
        userId: 1, // ID администратора
      },
    });
  };

const complaintResolvers: ComplaintResolvers = {
    Query: {
        getComplaints: async () => {
            try {
              const complaints = await prisma.complaint.findMany({
                where: {
                  status: "PENDING", // Фильтрация по статусу (нерешенные жалобы)
                },
                include: {
                  reportedByUser: true, // Информация о пользователе, который подал жалобу
                  reportedUser: true, // Информация о пользователе, на которого подана жалоба
                },
              });
        
              return complaints;
            } catch (error) {
              console.error("Error fetching complaints:", error);
              throw new Error("Failed to fetch complaints");
            }
          },
    },
    Mutation: {
        createComplaint: async (_, { reportedUserId, reason }, { user }) => {
            if (!user) {
              throw new Error("Not authenticated");
            }
        
            // Проверка, чтобы пользователь не мог пожаловаться сам на себя
            if (user.id === reportedUserId) {
              throw new Error("You cannot report yourself");
            }
        
            try {
              // Создаем жалобу в базе данных
              const complaint = await prisma.complaint.create({
                data: {
                  reason,
                  reportedBy: user.id,
                  reportedUser: reportedUserId,
                },
              });

              // Отправка уведомления админу
        await createComplaintNotification({
            reason: complaint.reason,
            reportedUser: complaint.reportedUser.id,
          });
  
        
              return {
                id: complaint.id,
                reason: complaint.reason,
                status: complaint.status,
                reportedByUser: complaint.reportedByUser,
                reportedUser: complaint.reportedUser,
                createdAt: complaint.createdAt.toISOString(),
                updatedAt: complaint.updatedAt.toISOString(),
              };
            } catch (error) {
              console.error("Error submitting complaint:", error);
              throw new Error("Failed to submit complaint");
            }
        },
        resolveComplaint: async (
            _: unknown,
            { complaintId },
            { user }
          ) => {
            if (!user) {
              throw new Error("Not authenticated");
            }
      
            // Получаем жалобу по ID
            const complaint = await prisma.complaint.findUnique({
              where: { id: complaintId },
            });
      
            if (!complaint) {
              throw new Error("Complaint not found");
            }
      
            // Проверка, что текущий пользователь — администратор, чтобы разрешить жалобу
            if (user.role !== "ADMIN") {
              throw new Error("Unauthorized to resolve complaint");
            }
      
            // Обновляем статус жалобы на RESOLVED
            const updatedComplaint = await prisma.complaint.update({
              where: { id: complaintId },
              data: { status: "RESOLVED" },
            });
      
            return {
              id: updatedComplaint.id,
              reason: updatedComplaint.reason,
              status: updatedComplaint.status,
              reportedByUser: updatedComplaint.reportedByUser,
              reportedUser: updatedComplaint.reportedUser,
              createdAt: updatedComplaint.createdAt.toISOString(),
              updatedAt: updatedComplaint.updatedAt.toISOString(),
            };
          },
        },
    }

export default complaintResolvers;