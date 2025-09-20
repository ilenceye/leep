import type { CreateLeepFn } from "@/hooks/useLeepStore";
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
import { format } from "date-fns";
import { PlusIcon } from "lucide-react";

export function CreateLeep({
  selectedDateStr,
  onCreate,
}: {
  selectedDateStr: string;
  onCreate: CreateLeepFn;
}) {
  const defaultSleepTime = format(new Date(), "HH:mm");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const time = formData.get("time") as string;
    const note = (formData.get("note") as string).trim() || undefined;
    const id = window.crypto.randomUUID();
    onCreate({ id, date: selectedDateStr, sleepTime: time, note });
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
          <DrawerTitle>Add</DrawerTitle>
          <DrawerDescription className="sr-only"></DrawerDescription>
        </DrawerHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 px-4">
            <Input
              name="time"
              type="time"
              className="text-center"
              defaultValue={defaultSleepTime}
            />
            <Input
              name="note"
              type="text"
              placeholder="Note..."
              autoComplete="off"
            />
          </div>
          <DrawerFooter>
            <Button>Save</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
