import { useLeepStore } from "@/hooks/useLeepStore";
import { isSleepTime, isWakeTime } from "@/lib/utils";
import { Button } from "@/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/ui/drawer";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Textarea } from "@/ui/textarea";
import { format } from "date-fns";
import { PlusIcon } from "lucide-react";

export function CreateLeep({ selectedDateStr }: { selectedDateStr: string }) {
  const createLeep = useLeepStore((s) => s.createLeep);
  const date = new Date();
  const now = format(date, "HH:mm");
  const defaultWakeTime = isWakeTime(date) ? now : undefined;
  const defaultSleepTime = isSleepTime(date) ? now : undefined;

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const wakeTime = formData.get("wake-time") as string;
    const sleepTime = formData.get("sleep-time") as string;
    const note = (formData.get("note") as string).trim() || undefined;
    createLeep({ date: selectedDateStr, wakeTime, sleepTime, note });
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button size="icon" className="size-10">
          <PlusIcon className="size-6" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>新增</DrawerTitle>
          <DrawerDescription className="sr-only"></DrawerDescription>
        </DrawerHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6 px-4">
            <div className="space-y-2">
              <Label className="text-secondary-foreground">起床时间</Label>
              <Input
                name="wake-time"
                type="time"
                className="text-center"
                defaultValue={defaultWakeTime}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-secondary-foreground">入睡时间</Label>
              <Input
                name="sleep-time"
                type="time"
                className="text-center"
                defaultValue={defaultSleepTime}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-secondary-foreground">备注</Label>
              <Textarea
                name="note"
                placeholder="输入备注"
                autoComplete="off"
                className="resize-none"
              />
            </div>
          </div>
          <DrawerFooter>
            <Button>保存</Button>
            <DrawerClose asChild>
              <Button variant="outline">取消</Button>
            </DrawerClose>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
