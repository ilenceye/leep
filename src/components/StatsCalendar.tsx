import { useState } from "react";

import { useGlobalStore } from "@/hooks/useGlobalStore";
import { cn } from "@/lib/classnames";
import { getSleepDurationType } from "@/lib/sleepCalculations";
import { Calendar, CalendarDayButton } from "@/ui/calendar";
import { endOfDay, format, startOfDay } from "date-fns";
import { zhCN } from "react-day-picker/locale";

export function StatsCalendar({
  sleepStats,
}: {
  sleepStats: Map<string, number>;
}) {
  const weekStartsOn = useGlobalStore((s) => s.weekStartsOn);
  const month = useGlobalStore((s) => s.month);
  const setMonth = useGlobalStore((s) => s.setMonth);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const start = startOfDay(new Date("2025-09-06"));
  const end = endOfDay(new Date());

  return (
    <div className="flex-1">
      <Calendar
        mode="single"
        className="w-full p-0"
        required
        disabled={{ before: start, after: end }}
        selected={selectedDate}
        onSelect={setSelectedDate}
        month={month}
        onMonthChange={setMonth}
        weekStartsOn={weekStartsOn}
        showOutsideDays={false}
        locale={zhCN}
        components={{
          DayButton: ({ children, day, modifiers, className, ...props }) => {
            const dayStr = format(day.date, "yyyy-MM-dd");
            const duration = sleepStats.get(dayStr);
            const sleepType = duration
              ? getSleepDurationType(duration)
              : undefined;

            return (
              <CalendarDayButton
                day={day}
                modifiers={modifiers}
                className={cn(className, "grid grid-rows-3 p-1.5", {
                  "bg-green-200": sleepType === "excellent",
                  "bg-green-100": sleepType === "good",
                  "bg-yellow-200": sleepType === "fair",
                  "bg-red-200": sleepType === "poor",
                  "bg-muted": !modifiers.disabled && sleepType === undefined,
                })}
                {...props}
              >
                <span
                  className={cn("row-span-2", modifiers.today && "font-bold")}
                >
                  {children}
                </span>
                {!modifiers.disabled && (
                  <span className="text-xs text-gray-600">
                    {duration ? `${duration}h` : "--"}
                  </span>
                )}
              </CalendarDayButton>
            );
          },
        }}
      />

      {/* 图例说明 */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 bg-green-200"></div>
          <span>优秀 (≥8h)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 bg-green-100"></div>
          <span>良好 (7-8h)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 bg-yellow-200"></div>
          <span>一般 (6-7h)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 bg-red-200"></div>
          <span>{"不足 (<6h)"}</span>
        </div>
      </div>
    </div>
  );
}
