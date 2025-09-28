import { useLeepStore } from "@/hooks/useLeepStore";
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
  const updateLeep = useLeepStore((s) => s.createLeep);
  const defaultSleepTime = format(new Date(), "HH:mm");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const time = formData.get("time") as string;
    const note = (formData.get("note") as string).trim() || undefined;
    updateLeep({ date: selectedDateStr, sleepTime: time, note });
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
              <Label className="text-secondary-foreground">入睡时间</Label>
              <Input
                name="time"
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
