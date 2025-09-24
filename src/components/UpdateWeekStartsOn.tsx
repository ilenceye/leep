import { useGlobalStore } from "@/hooks/useGlobalStore";
import { cn } from "@/lib/classnames";
import { Button, buttonVariants } from "@/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/ui/drawer";
import { CalendarDaysIcon } from "lucide-react";

export function UpdateWeekStartsOn() {
  const setWeekStartsOn = useGlobalStore((s) => s.setWeekStartsOn);
  const weekStartsOn = useGlobalStore((s) => s.weekStartsOn);
  const displayWeekStartsOn = weekStartsOn === 0 ? "周日" : "周一";

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="secondary"
          size="lg"
          className="justify-between px-4 text-base"
        >
          <span className="flex items-center gap-4">
            <CalendarDaysIcon /> 一周起始日
          </span>
          <span className="text-muted-foreground text-sm">
            {displayWeekStartsOn}
          </span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>一周起始日</DrawerTitle>
          <DrawerDescription className="sr-only"></DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col p-4">
          <DrawerClose
            className={cn(
              buttonVariants({ variant: "secondary", size: "lg" }),
              "rounded-b-none",
              weekStartsOn === 0 && "font-bold",
            )}
            onClick={() => setWeekStartsOn(0)}
          >
            周日
          </DrawerClose>
          <DrawerClose
            className={cn(
              buttonVariants({ variant: "secondary", size: "lg" }),
              "rounded-t-none border-t",
              weekStartsOn === 1 && "font-bold",
            )}
            onClick={() => setWeekStartsOn(1)}
          >
            周一
          </DrawerClose>
        </div>
        <div className="mt-4" />
      </DrawerContent>
    </Drawer>
  );
}
