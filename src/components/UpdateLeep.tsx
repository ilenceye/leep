import type { UpdateLeepFn } from "@/hooks/useLeep";
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

export function UpdateLeep({
  leep,
  onUpdate,
}: {
  leep: Leep;
  onUpdate: UpdateLeepFn;
}) {
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const time = formData.get("time") as string;
    const note = (formData.get("note") as string).trim() || undefined;
    onUpdate(leep.id, { sleepTime: time, note });
  };

  return (
    <Drawer>
      <DrawerTrigger className="absolute inset-0" />
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Edit</DrawerTitle>
          <DrawerDescription className="sr-only"></DrawerDescription>
        </DrawerHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 px-4">
            <Input
              name="time"
              type="time"
              className="text-center"
              defaultValue={leep.sleepTime}
            />
            <Input
              name="note"
              type="text"
              placeholder="Note..."
              autoComplete="off"
              defaultValue={leep.note}
            />
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button type="submit">Save</Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
