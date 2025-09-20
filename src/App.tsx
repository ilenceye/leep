import { useState } from "react";

import { CreateLeep } from "@/components/CreateLeep";
import { LeepCalendar } from "@/components/LeepCalendar";
import { LeepCard } from "@/components/LeepCard";
import { UpdateLeep } from "@/components/UpdateLeep";
import { useLeep } from "@/hooks/useLeep";
import { format } from "date-fns";

export default function App() {
  const { leeps, createLeep, updateLeep } = useLeep();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const selectedDateStr = format(selectedDate, "yyyy-MM-dd");
  const currentLeep = leeps.find((l) => l.date === selectedDateStr);

  return (
    <div className="mx-auto h-screen max-w-md px-4">
      <div className="flex h-full flex-col py-4">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold">Leep</h1>
        </div>
        <LeepCalendar
          leeps={leeps}
          selectedDate={selectedDate}
          onSelect={setSelectedDate}
        />
        {currentLeep && (
          <div className="relative mt-6">
            <LeepCard leep={currentLeep} />
            <UpdateLeep leep={currentLeep} onUpdate={updateLeep} />
          </div>
        )}
        {!currentLeep && (
          <div className="mt-auto text-center">
            <CreateLeep
              selectedDateStr={selectedDateStr}
              onCreate={createLeep}
            />
          </div>
        )}
      </div>
    </div>
  );
}
