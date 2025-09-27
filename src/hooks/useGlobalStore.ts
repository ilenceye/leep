import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * - 0 → 周日
 * - 1 → 周一
 */
type WeekStartsOn = 0 | 1;

type GlobalStore = {
  weekStartsOn: WeekStartsOn;
  setWeekStartsOn: (value: WeekStartsOn) => void;
  month: Date;
  setMonth: (month: Date) => void;
};

export const useGlobalStore = create<GlobalStore>()(
  persist(
    (set) => ({
      weekStartsOn: 1,
      setWeekStartsOn: (value: WeekStartsOn) => set({ weekStartsOn: value }),
      month: new Date(),
      setMonth: (month: Date) => set({ month }),
    }),
    {
      name: "global-store",
      version: 0,
      partialize: (s) => ({ weekStartsOn: s.weekStartsOn }),
    },
  ),
);
