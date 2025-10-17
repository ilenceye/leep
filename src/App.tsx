import { useEffect, useState } from "react";

import { CreateLeep } from "@/components/CreateLeep";
import { LeepCalendar } from "@/components/LeepCalendar";
import { Settings } from "@/components/Settings";
import { useLeepStore } from "@/hooks/useLeepStore";
import { format } from "date-fns";

export default function App() {
  const [loading, setLoading] = useState(true);
  const leeps = useLeepStore((s) => s.leeps);
  const loadLeeps = useLeepStore((s) => s.loadLeeps);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const selectedDateStr = format(selectedDate, "yyyy-MM-dd");
  const currentLeep = leeps.get(selectedDateStr);

  useEffect(() => {
    loadLeeps().then(() => setLoading(false));
  }, [loadLeeps]);

  if (loading) return null;

  return (
    <div className="mx-auto h-dvh max-w-md px-4">
      <div className="flex h-full flex-col py-4">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-bold">Leep</h1>
          <Settings />
        </div>
        <LeepCalendar
          leeps={leeps}
          selectedDate={selectedDate}
          onSelect={setSelectedDate}
        />
        {!currentLeep && (
          <div className="mt-auto text-center">
            <CreateLeep selectedDateStr={selectedDateStr} />
          </div>
        )}
      </div>
    </div>
  );
}
