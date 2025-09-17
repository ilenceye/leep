import { CreateLeep } from "@/components/CreateLeep";
import { LeepCalendar } from "@/components/LeepCalendar";
import { useLeepStore } from "@/hooks/useLeep";
import { format } from "date-fns";

export default function App() {
  const selectedDate = useLeepStore((s) => s.selectedDate);
  const leeps = useLeepStore((s) => s.leeps);
  const selectedDateStr = format(selectedDate, "yyyy-MM-dd");
  const existingLeep = leeps.find((l) => l.date === selectedDateStr);

  return (
    <div className="mx-auto h-screen max-w-md px-4">
      <div className="flex h-full flex-col py-4">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold">Leep</h1>
        </div>
        <LeepCalendar />
        {!existingLeep && (
          <div className="mt-auto text-center">
            <CreateLeep />
          </div>
        )}
      </div>
    </div>
  );
}
