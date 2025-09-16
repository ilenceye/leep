import { useState } from "react";

import { LeepDrawer } from "@/components/LeepDrawer";
import { useLeepStore } from "@/hooks/useLeep";
import { cn } from "@/lib/classnames";
import { Calendar, CalendarDayButton } from "@/ui/calendar";
import { endOfDay, format, isWithinInterval, startOfDay } from "date-fns";

export function LeepCalendar() {
  const leeps = useLeepStore((s) => s.leeps);

  const selectedDate = useLeepStore((s) => s.selectedDate);
  const setSelectedDate = useLeepStore((s) => s.setSelectedDate);

  const start = startOfDay(new Date("2025-09-06"));
  const end = endOfDay(new Date());

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleSelect = (date: Date) => {
    setSelectedDate(date);
    setIsDrawerOpen(true);
  };

  return (
    <>
      <LeepDrawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} />
      <Calendar
        mode="single"
        className="w-full p-0"
        required
        disabled={{ before: start, after: end }}
        selected={selectedDate}
        onSelect={handleSelect}
        weekStartsOn={1}
        components={{
          DayButton: ({ children, day, modifiers, className, ...props }) => {
            const dayStr = format(day.date, "yyyy-MM-dd");
            const sleepTime = leeps.find((l) => l.date === dayStr)?.sleepTime;
            const sleepType = getSleepType(sleepTime);

            const isInRange = isWithinInterval(day.date, { start, end });

            return (
              <CalendarDayButton
                day={day}
                modifiers={modifiers}
                className={cn(className, "grid grid-rows-3 p-1.5", {
                  "bg-green-200": sleepType === "early",
                  "bg-yellow-200": sleepType === "late",
                  "bg-red-200": sleepType === "night",
                  "bg-muted": isInRange && sleepType === undefined,
                })}
                {...props}
              >
                <span
                  className={cn("row-span-2", modifiers.today && "font-bold")}
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
    </>
  );
}

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
