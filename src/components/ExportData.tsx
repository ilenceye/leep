import { db } from "@/lib/db";
import { downloadFile } from "@/lib/dom";
import { Button } from "@/ui/button";
import { UploadIcon } from "lucide-react";
import { toast } from "sonner";

export function ExportData({ onComplete }: { onComplete: () => void }) {
  const download = async () => {
    const leeps = await db.values();

    downloadFile({
      content: JSON.stringify({ leeps }),
      filename: "leep.backup.json",
      type: "application/json",
    });

    toast.success("导出成功");
    onComplete();
  };

  return (
    <Button
      variant="secondary"
      size="lg"
      className="justify-start gap-4 rounded-b-none text-base"
      onClick={download}
    >
      <UploadIcon /> 导出数据
    </Button>
  );
}
