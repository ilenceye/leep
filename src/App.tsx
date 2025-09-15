import { LeepCalendar } from "@/components/LeepCalendar";

export default function App() {
  return (
    <div className="mx-auto mt-6 w-full max-w-md px-4">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold">Leep</h1>
      </div>
      <LeepCalendar />
    </div>
  );
}
