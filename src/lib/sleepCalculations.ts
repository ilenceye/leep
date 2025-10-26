/**
 * 计算睡眠时长（小时）
 * @param sleepTime 入睡时间 "HH:mm"
 * @param wakeTime 起床时间 "HH:mm"
 * @returns 睡眠时长（小时），保留1位小数，如果数据不完整返回null
 */
export function calculateSleepDuration(sleepTime: string, wakeTime: string): number | null {
  if (!sleepTime || !wakeTime) return null;

  const [sleepHour, sleepMinute] = sleepTime.split(":").map(Number);
  const [wakeHour, wakeMinute] = wakeTime.split(":").map(Number);

  // 计算总分钟数
  let sleepMinutes = sleepHour * 60 + sleepMinute;
  let wakeMinutes = wakeHour * 60 + wakeMinute;

  // 如果起床时间小于入睡时间，说明跨天了（比如23:00睡，7:00起）
  if (wakeMinutes < sleepMinutes) {
    wakeMinutes += 24 * 60; // 加上一天的分钟数
  }

  const durationMinutes = wakeMinutes - sleepMinutes;
  const durationHours = durationMinutes / 60;

  // 返回保留1位小数的时长
  return Math.round(durationHours * 10) / 10;
}

/**
 * 根据睡眠时长获取颜色类型
 * @param duration 睡眠时长（小时）
 * @returns 颜色类型
 */
export function getSleepDurationType(duration: number): "excellent" | "good" | "fair" | "poor" {
  if (duration >= 8) return "excellent"; // 优秀：8小时以上
  if (duration >= 7) return "good";      // 良好：7-8小时
  if (duration >= 6) return "fair";      // 一般：6-7小时
  return "poor";                         // 不足：6小时以下
}