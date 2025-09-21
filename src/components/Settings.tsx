import { ExportData } from "@/components/ExportData";
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
  return (
    <Drawer>
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
            <h2 className="text-muted-foreground text-sm">我的数据</h2>
            <div className="flex flex-col rounded-md">
              <ExportData />
            </div>
          </div>
        </div>
        <div className="mt-4" />
      </DrawerContent>
    </Drawer>
  );
}
