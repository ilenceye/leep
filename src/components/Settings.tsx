import { useState } from "react";

import { ExportData } from "@/components/ExportData";
import { ImportData } from "@/components/ImportData";
import { UpdateWeekStartsOn } from "@/components/UpdateWeekStartsOn";
import { Button } from "@/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/ui/drawer";
import { SettingsIcon } from "lucide-react";

export function Settings() {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className="size-9">
          <SettingsIcon className="size-5" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="sr-only">
          <DrawerTitle />
          <DrawerDescription />
        </DrawerHeader>
        <div className="p-4">
          <div className="space-y-2">
            <h2 className="text-muted-foreground text-sm">常规设置</h2>
            <div className="flex flex-col rounded-md">
              <UpdateWeekStartsOn />
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="space-y-2">
            <h2 className="text-muted-foreground text-sm">我的数据</h2>
            <div className="flex flex-col rounded-md">
              <ExportData />
              <ImportData onComplete={close} />
            </div>
          </div>
        </div>
        <div className="mt-4" />
      </DrawerContent>
    </Drawer>
  );
}
