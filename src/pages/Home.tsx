import { useState } from "react";

import { CreateLeep } from "@/components/CreateLeep";
import { LeepCalendar } from "@/components/LeepCalendar";
import { useLeepData } from "@/hooks/useLeepData";
import { format } from "date-fns";

export function Home() {
  const { loading, leeps } = useLeepData();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const selectedDateStr = format(selectedDate, "yyyy-MM-dd");
  const currentLeep = leeps.get(selectedDateStr);

  if (loading) return null;

  return (
    <>
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
    </>
  );
}
