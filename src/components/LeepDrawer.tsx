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
} from "@/ui/drawer";
import { Input } from "@/ui/input";
import { format } from "date-fns";

export function LeepDrawer({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const selectedDate = useLeepStore((s) => s.selectedDate);
  const leeps = useLeepStore((s) => s.leeps);
  const createLeep = useLeepStore((s) => s.createLeep);
  const updateLeep = useLeepStore((s) => s.updateLeep);

  const selectedDateStr = format(selectedDate, "yyyy-MM-dd");
  const existingLeep = leeps.find((l) => l.date === selectedDateStr);
  const sleepTime = existingLeep?.sleepTime || format(new Date(), "HH:mm");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const time = formData.get("time") as string;

    if (!existingLeep) {
      const id = window.crypto.randomUUID();
      createLeep({ id, date: selectedDateStr, sleepTime: time });
    } else {
      updateLeep(existingLeep.id, { sleepTime: time });
    }

    onOpenChange(false);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            {existingLeep ? "Edit sleep time" : "Add sleep time"}
          </DrawerTitle>
          <DrawerDescription className="sr-only"></DrawerDescription>
        </DrawerHeader>
        <form onSubmit={handleSubmit}>
          <div className="px-4">
            <Input
              name="time"
              type="time"
              className="text-center"
              defaultValue={sleepTime}
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
