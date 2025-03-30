import { formatDistanceToNow, format } from "date-fns";

export const formatLastActive = (timestamp: string | null) => {
  if (!timestamp) return "No data";

  const lastActiveDate = new Date(timestamp);
  const now = new Date();

  if (lastActiveDate.toDateString() === now.toDateString()) {
    return `Last been today at ${format(lastActiveDate, "HH:mm")}`;
  }

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  if (lastActiveDate.toDateString() === yesterday.toDateString()) {
    return `Last been yesterday at ${format(lastActiveDate, "HH:mm")}`;
  }

  return `Last been ${formatDistanceToNow(lastActiveDate, { addSuffix: true })}`;
};

