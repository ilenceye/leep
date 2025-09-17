import type { Leep } from "@/hooks/useLeep";

export function LeepCard({ leep }: { leep: Leep }) {
  return (
    <div className="rounded p-4 shadow">
      <div className="flex items-start gap-4">
        <span className="font-bold">{leep.sleepTime}</span>
        <span>{leep.note}</span>
      </div>
    </div>
  );
}
