import { StatsCalendar } from "@/components/StatsCalendar";
import { StatsCalendarLegend } from "@/components/StatsCalendarLegend";
import { useLeepData } from "@/hooks/useLeepData";
import { calculateSleepDuration } from "@/lib/sleepCalculations";

export function Stats() {
  const { loading, leeps } = useLeepData();

  if (loading) return null;

  // 计算睡眠统计数据
  const sleepStats = new Map();
  leeps.forEach((leep, date) => {
    if (leep.sleepTime && leep.wakeTime) {
      const duration = calculateSleepDuration(leep.sleepTime, leep.wakeTime);
      if (duration !== null) {
        sleepStats.set(date, duration);
      }
    }
  });

  return (
    <div className="flex h-full flex-col">
      <StatsCalendar sleepStats={sleepStats} />
      <StatsCalendarLegend />
    </div>
  );
}
