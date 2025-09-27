import { LogCard } from "@/components/LogCard";
import { useGlobalStore } from "@/hooks/useGlobalStore";
import { useMonthlyLogs } from "@/hooks/useLeepStore";

export function MonthlyLogs() {
  const month = useGlobalStore((s) => s.month);
  const logs = useMonthlyLogs(month);

  return (
    <ul>
      {logs.map((log) => (
        <li key={log.date}>
          <LogCard log={log} />
        </li>
      ))}
    </ul>
  );
}
