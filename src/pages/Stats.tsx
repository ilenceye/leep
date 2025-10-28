import { StatsCalendar } from "@/components/StatsCalendar";
import { StatsCalendarLegend } from "@/components/StatsCalendarLegend";
import { useLeepData } from "@/hooks/useLeepData";
import { calculateSleepDuration } from "@/lib/sleepCalculations";

export function Stats() {
  const { loading, leeps } = useLeepData();

  if (loading) return null;

  // 计算睡眠统计数据
  const sleepStats = new Map();

  // 遍历所有记录，计算某天的睡眠时长（当天的入睡时间至第二天的起床时间）
  leeps.forEach((leep, date) => {
    // 只有当天的入睡时间存在时才计算
    if (leep.sleepTime) {
      // 获取第二天的日期
      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);
      const nextDayStr = nextDay.toISOString().split("T")[0];

      // 获取第二天的起床时间
      const nextDayLeep = leeps.get(nextDayStr);
      const wakeTime = nextDayLeep?.wakeTime;

      // 如果第二天有起床时间，则计算睡眠时长
      if (wakeTime) {
        const duration = calculateSleepDuration(leep.sleepTime, wakeTime);
        if (duration !== null) {
          sleepStats.set(date, duration);
        }
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
