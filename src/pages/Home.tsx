import { LeepCalendar } from "@/components/LeepCalendar";
import { useLeepData } from "@/hooks/useLeepData";

export function Home() {
  const { loading, leeps } = useLeepData();

  if (loading) return null;

  return (
    <>
      <LeepCalendar leeps={leeps} />
    </>
  );
}
