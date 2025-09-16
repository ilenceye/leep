import { create } from "zustand";
import { persist } from "zustand/middleware";

type Leep = {
  id: string;
  date: string;
  sleepTime: string;
};

type LeepStore = {
  //
  leeps: Leep[];
  createLeep: (leep: Leep) => void;
  updateLeep: (id: string, changes: Pick<Leep, "sleepTime">) => void;
  //
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
};

export const useLeepStore = create<LeepStore>()(
  persist(
    (set, get) => ({
      //
      leeps: [],
      createLeep: (leep) => set({ leeps: [...get().leeps, leep] }),
      updateLeep: (id, changes) => {
        const newLeeps = get().leeps.map((l) =>
          l.id === id ? { ...l, ...changes } : l,
        );
        set({ leeps: newLeeps });
      },
      //
      selectedDate: new Date(),
      setSelectedDate: (date: Date) => set({ selectedDate: date }),
    }),
    {
      name: "leep-store",
    },
  ),
);
