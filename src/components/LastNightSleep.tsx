import { useMemo } from "react";

import { calculateSleepDuration } from "@/lib/sleepCalculations";
import type { LeepMap } from "@/types";
import { format, subDays } from "date-fns";

export function LastNightSleep({ leeps }: { leeps: LeepMap }) {
  const lastNightSleep = useMemo(() => {
    // 获取昨天的日期
    const yesterday = subDays(new Date(), 1);
    const yesterdayStr = format(yesterday, "yyyy-MM-dd");

    // 获取今天的日期
    const todayStr = format(new Date(), "yyyy-MM-dd");

    // 检查昨天是否有入睡时间，今天是否有起床时间
    const yesterdayLeep = leeps.get(yesterdayStr);
    const todayLeep = leeps.get(todayStr);

    if (yesterdayLeep?.sleepTime && todayLeep?.wakeTime) {
      const duration = calculateSleepDuration(
        yesterdayLeep.sleepTime,
        todayLeep.wakeTime,
      );
      if (duration !== null) {
        return {
          sleepTime: yesterdayLeep.sleepTime,
          wakeTime: todayLeep.wakeTime,
          duration,
        };
      }
    }

    return null;
  }, [leeps]);

  if (!lastNightSleep) {
    return null;
  }

  // 格式化时长显示
  const hours = Math.floor(lastNightSleep.duration);
  const minutes = Math.round((lastNightSleep.duration - hours) * 60);

  return (
    <div className="rounded-lg bg-blue-50 p-4 text-center">
      <p className="text-sm font-medium text-blue-800">
        你昨晚睡了 {hours}小时{minutes > 0 ? `${minutes}分钟` : ""}
      </p>
      <p className="mt-1 text-xs text-blue-600">
        昨晚入睡时间: {lastNightSleep.sleepTime}
      </p>
      <p className="mt-1 text-xs text-blue-600">
        今天起床时间: {lastNightSleep.wakeTime}
      </p>
    </div>
  );
}
