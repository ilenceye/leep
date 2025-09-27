import { UpdateLeep } from "@/components/UpdateLeep";
import type { Log } from "@/types";

export function LogCard({ log }: { log: Log }) {
  return (
    <div className="relative border-b py-4">
      <div className="space-y-2">
        <div className="text-muted-foreground text-xs">
          <time dateTime={log.date}>{log.date}</time>
        </div>
        <p className="text-[15px]">{log.note}</p>
      </div>
      <UpdateLeep leep={log} />
    </div>
  );
}
