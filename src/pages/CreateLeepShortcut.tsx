import { useLeepByDay, useLeepStore } from "@/hooks/useLeepStore";
import { isSleepTime, isWakeTime } from "@/lib/utils";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { format } from "date-fns";
import { useSearchParams } from "wouter";

const useDefaultTimes = () => {
  const date = new Date();
  const today = format(date, "yyyy-MM-dd");
  const now = format(date, "HH:mm");
  const savedTodayLeep = useLeepByDay(today);
  const todayLeep = savedTodayLeep ?? { date: today };

  const resolveTime = (type: "wake" | "sleep") => {
    const saved = type === "wake" ? todayLeep.wakeTime : todayLeep.sleepTime;
    const shouldUseNow = type === "wake" ? isWakeTime(date) : isSleepTime(date);
    return saved ?? (shouldUseNow ? now : undefined);
  };

  const defaultWakeTime = resolveTime("wake");
  const defaultSleepTime = resolveTime("sleep");

  return { todayLeep, defaultWakeTime, defaultSleepTime };
};

export function CreateLeepShortcut() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  const { todayLeep, defaultWakeTime, defaultSleepTime } = useDefaultTimes();

  const createLeep = useLeepStore((s) => s.createLeep);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (type === "sleep") {
      const sleepTime = formData.get("sleep-time") as string;
      await createLeep({ ...todayLeep, sleepTime });
    } else {
      const wakeTime = formData.get("wake-time") as string;
      await createLeep({ ...todayLeep, wakeTime });
    }

    window.close();
  };

  return (
    <div className="space-y-6 py-4">
      <div>
        <h1 className="font-bold">
          {type === "sleep" ? "新增入睡时间记录" : "新增起床时间记录"}
        </h1>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {type === "sleep" ? (
          <div className="space-y-2">
            <Label className="text-secondary-foreground">入睡时间</Label>
            <Input
              name="sleep-time"
              type="time"
              className="text-center"
              defaultValue={defaultSleepTime}
            />
          </div>
        ) : (
          <div className="space-y-2">
            <Label className="text-secondary-foreground">起床时间</Label>
            <Input
              name="wake-time"
              type="time"
              className="text-center"
              defaultValue={defaultWakeTime}
            />
          </div>
        )}
        <div className="space-y-2">
          <Button className="w-full" type="submit">
            保存
          </Button>
          <Button
            variant="outline"
            className="w-full"
            type="button"
            onClick={() => window.close()}
          >
            取消
          </Button>
        </div>
      </form>
    </div>
  );
}
