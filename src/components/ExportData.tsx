import { useLeepStore } from "@/hooks/useLeepStore";
import { downloadFile } from "@/lib/dom";
import { Button } from "@/ui/button";
import { UploadIcon } from "lucide-react";

export function ExportData() {
  const leeps = useLeepStore((s) => s.leeps);

  return (
    <Button
      variant="secondary"
      size="lg"
      className="justify-start gap-4 text-base"
      onClick={() => {
        downloadFile({
          content: JSON.stringify({ leeps: Object.fromEntries(leeps) }),
          filename: "leep.backup.json",
          type: "application/json",
        });
      }}
    >
      <UploadIcon /> 导出数据
    </Button>
  );
}
