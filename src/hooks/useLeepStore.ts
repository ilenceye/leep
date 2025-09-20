import { useCallback, useState } from "react";

import * as db from "idb-keyval";
import type { Leep, LeepMap } from "@/types";

export type CreateLeepFn = ReturnType<typeof useLeepStore>["createLeep"];
export type UpdateLeepFn = ReturnType<typeof useLeepStore>["updateLeep"];

export const useLeepStore = () => {
  const [leeps, setLeeps] = useState<LeepMap>(new Map());

  const loadLeeps = useCallback(async () => {
    const entries = (await db.entries()) as [string, Leep][];
    setLeeps(new Map(entries));
  }, []);

  const createLeep = useCallback(async (leep: Leep) => {
    await db.set(leep.date, leep);
    setLeeps((prev) => new Map(prev).set(leep.date, leep));
  }, []);

  const updateLeep = useCallback(async (date: string, leep: Leep) => {
    await db.set(leep.date, leep);
    setLeeps((prev) => new Map(prev).set(date, leep));
  }, []);

  return { leeps, loadLeeps, createLeep, updateLeep };
};
