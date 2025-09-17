import { useLeepStore } from "@/hooks/useLeep";
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

export function CreateLeep() {
  const selectedDate = useLeepStore((s) => s.selectedDate);
  const createLeep = useLeepStore((s) => s.createLeep);

  const selectedDateStr = format(selectedDate, "yyyy-MM-dd");
  const defaultSleepTime = format(new Date(), "HH:mm");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const time = formData.get("time") as string;
    const id = window.crypto.randomUUID();
    createLeep({ id, date: selectedDateStr, sleepTime: time });
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
          <div className="px-4">
            <Input
              name="time"
              type="time"
              className="text-center"
              defaultValue={defaultSleepTime}
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
