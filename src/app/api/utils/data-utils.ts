import { addDays, format, startOfWeek } from "date-fns";
type DateRange = {
  startDate: string;
  endDate: string;
};
export function getDateRange(range: string): DateRange {
  const today = new Date();

  switch (range) {
    case "today":
      return {
        startDate: "today",
        endDate: "today",
      };

    case "yesterday":
      return {
        startDate: "yesterday",
        endDate: "yesterday",
      };

    case "thisWeek":
      return {
        startDate: format(startOfWeek(today), "yyyy-MM-dd"),
        endDate: "today",
      };
    case "lastWeek": {
      // Get start of last week by going back 7 days and finding start of that week
      const lastWeekStart = startOfWeek(addDays(today, -7));
      // Get end of last week by going forward 6 days from start (to include all 7 days)
      const lastWeekEnd = addDays(lastWeekStart, 6);
      return {
        startDate: format(lastWeekStart, "yyyy-MM-dd"),
        endDate: format(lastWeekEnd, "yyyy-MM-dd"),
      };
    }

    case "7days":
      return {
        startDate: "7daysAgo",
        endDate: "today",
      };

    case "14days":
      return {
        startDate: "14daysAgo",
        endDate: "today",
      };

    case "28days":
      return {
        startDate: "28daysAgo",
        endDate: "today",
      };

    case "30days":
      return {
        startDate: "30daysAgo",
        endDate: "today",
      };

    case "60days":
      return {
        startDate: "60daysAgo",
        endDate: "today",
      };

    case "90days":
      return {
        startDate: "90daysAgo",
        endDate: "today",
      };

    default:
      return {
        startDate: "14daysAgo",
        endDate: "today",
      };
  }
}
