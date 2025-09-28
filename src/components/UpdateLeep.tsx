import { useLeepStore } from "@/hooks/useLeepStore";
import type { Leep } from "@/types";
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

export function UpdateLeep({ leep }: { leep: Leep }) {
  const updateLeep = useLeepStore((s) => s.updateLeep);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const wakeTime = formData.get("wake-time") as string;
    const sleepTime = formData.get("sleep-time") as string;
    const note = (formData.get("note") as string).trim() || undefined;
    updateLeep(leep.date, { ...leep, wakeTime, sleepTime, note });
  };

  return (
    <Drawer>
      <DrawerTrigger className="absolute inset-0" />
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>编辑</DrawerTitle>
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
                defaultValue={leep.wakeTime}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-secondary-foreground">入睡时间</Label>
              <Input
                name="time"
                type="time"
                className="text-center"
                defaultValue={leep.sleepTime}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-secondary-foreground">备注</Label>
              <Textarea
                name="note"
                placeholder="输入备注"
                autoComplete="off"
                defaultValue={leep.note}
                className="resize-none"
              />
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button type="submit">保存</Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button variant="outline">取消</Button>
            </DrawerClose>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
