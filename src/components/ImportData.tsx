import * as v from "valibot";
import { useLeepStore } from "@/hooks/useLeepStore";
import { cn } from "@/lib/classnames";
import { LeepSchema } from "@/types";
import { buttonVariants } from "@/ui/button";
import { TextFilePicker } from "@/ui/text-file-picker";
import { DownloadIcon } from "lucide-react";
import { toast } from "sonner";

const DataFileSchema = v.object({
  leeps: v.array(LeepSchema),
});

export function ImportData({ onComplete }: { onComplete: () => void }) {
  const createLeeps = useLeepStore((s) => s.createLeeps);

  const handleUpload = async (value: string) => {
    try {
      const data = v.parse(DataFileSchema, JSON.parse(value));
      await createLeeps(data.leeps);
      toast.success("导入成功");
    } catch (error) {
      console.error("导入失败", error);
      toast.error("导入失败");
    } finally {
      onComplete();
    }
  };

  return (
    <TextFilePicker
      className={cn(
        buttonVariants({
          variant: "secondary",
          size: "lg",
        }),
        "justify-start gap-4 rounded-t-none text-base",
      )}
      accept={[".json"]}
      onUpload={handleUpload}
    >
      <DownloadIcon className="-mr-[1px] size-[17px]" /> 导入数据
    </TextFilePicker>
  );
}
