import * as db from "idb-keyval";
import type { Leep, LeepMap } from "@/types";
import { create } from "zustand";

type LeepStore = {
  leeps: LeepMap;
  loadLeeps: () => Promise<void>;
  createLeep: (leep: Leep) => Promise<void>;
  updateLeep: (date: string, leep: Leep) => Promise<void>;
};

export const useLeepStore = create<LeepStore>((set) => ({
  leeps: new Map(),

  loadLeeps: async () => {
    const entries = (await db.entries()) as [string, Leep][];
    set({ leeps: new Map(entries) });
  },

  createLeep: async (leep) => {
    await db.set(leep.date, leep);
    set((state) => ({
      leeps: new Map(state.leeps).set(leep.date, leep),
    }));
  },

  updateLeep: async (date, leep) => {
    await db.set(leep.date, leep);
    set((state) => ({
      leeps: new Map(state.leeps).set(date, leep),
    }));
  },
}));
