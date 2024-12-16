"use client";

import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { isEqual } from "lodash";
import { DateRange } from "react-day-picker";
import {
  formatDateForUrl,
  getDefaultDateRange,
  parseDateFromUrl,
} from "@/utils/date";

export function CalendarDateRangePicker() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const dateRange =
    from && to
      ? {
          from: parseDateFromUrl(from),
          to: parseDateFromUrl(to),
        }
      : undefined;

  const [date, setDate] = useState<DateRange | undefined>(
    dateRange || getDefaultDateRange()
  );

  useEffect(() => {
    if (!date?.from || !date?.to) return;
    if (isEqual(date, dateRange)) return;
    if (dateRange) {
      setDate(dateRange);
    }
  }, [dateRange, setDate]);

  const handleSelect = (newDate: DateRange | undefined) => {
    setDate(newDate);
    if (!newDate?.from || !newDate?.to) return;

    const params = new URLSearchParams(searchParams);
    params.set("from", formatDateForUrl(newDate.from));
    params.set("to", formatDateForUrl(newDate.to));
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
