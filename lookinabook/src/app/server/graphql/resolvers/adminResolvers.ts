export const adminResolvers = {
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
  
    resolveComplaint: async (_, { complaintId }, { user }) => {
      if (user.role !== "ADMIN") {
        throw new Error("Not authorized");
      }
  
      try {
        // Обновление статуса жалобы на RESOLVED
        const complaint = await prisma.complaint.update({
          where: { id: complaintId },
          data: {
            status: "RESOLVED", // Статус жалобы меняем на "RESOLVED"
          },
        });
  
        // Логика решения жалобы (например, блокировка пользователя)
        // Вы можете здесь добавить дополнительные действия, такие как блокировка пользователя.
  
        return complaint;
      } catch (error) {
        console.error("Error resolving complaint:", error);
        throw new Error("Failed to resolve complaint");
      }
    },
  };
  