import { format, subMonths } from "date-fns";
import { DateRange } from "react-day-picker";

export const formatDateForUrl = (date: Date) => {
  return format(date, "yyyy-MM-dd");
};

export const parseDateFromUrl = (dateString: string) => {
  return new Date(dateString);
};

export const getDefaultDateRange = (): DateRange => ({
  from: subMonths(new Date(), 2),
  to: new Date(),
});
