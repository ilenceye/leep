import { useState } from "react";

import { cn } from "@/lib/classnames";
import { Calendar, CalendarDayButton } from "@/ui/calendar";
import { format, isToday, isWithinInterval, startOfDay } from "date-fns";

export function LeepCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const start = startOfDay(new Date("2025-09-06"));
  const end = new Date(Date.now());

  return (
    <Calendar
      mode="single"
      className="w-full p-0"
      selected={date}
      onSelect={setDate}
      weekStartsOn={1}
      components={{
        DayButton: ({ children, day, className, ...props }) => {
          const dayStr = format(day.date, "yyyy-MM-dd");
          const sleepTime = FAKE_LEEPS[dayStr];
          const sleepType = getSleepType(sleepTime);

          const isInRange = isWithinInterval(day.date, { start, end });

          return (
            <CalendarDayButton
              day={day}
              className={cn(className, "grid grid-rows-3 p-1.5", {
                "bg-green-200": sleepType === "early",
                "bg-yellow-200": sleepType === "late",
                "bg-red-200": sleepType === "night",
                "bg-muted": isInRange && sleepType === undefined,
              })}
              {...props}
            >
              <span
                className={cn("row-span-2", isToday(day.date) && "font-bold")}
              >
                {children}
              </span>
              <span className="text-xs text-gray-600">
                {isInRange && (sleepTime ?? "--")}
              </span>
            </CalendarDayButton>
          );
        },
      }}
    />
  );
}

const FAKE_LEEPS: Record<string, string> = {
  "2025-09-07": "22:40",
  "2025-09-09": "23:00",
  "2025-09-10": "01:00",
  "2025-09-11": "23:20",
  "2025-09-12": "23:20",
};

const getSleepType = (time: string | undefined) => {
  if (!time) return;

  const [h, m] = time.split(":").map(Number);
  const minutes = h * 60 + m;

  if (minutes >= 20 * 60 && minutes <= 22 * 60 + 59) {
    // 早睡: 20:00-22:59
    return "early";
  }
  if (minutes >= 23 * 60 && minutes <= 23 * 60 + 59) {
    // 晚睡: 23:00-23:59
    return "late";
  }
  if (minutes >= 0 && minutes < 6 * 60) {
    // 熬夜: 00:00-05:59
    return "night";
  }
};
