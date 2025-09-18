import { useState } from "react";

export type Leep = {
  id: string;
  date: string;
  sleepTime: string;
  note?: string;
};

export type CreateLeepFn = ReturnType<typeof useLeep>["createLeep"];
export type UpdateLeepFn = ReturnType<typeof useLeep>["updateLeep"];

export const useLeep = () => {
  const [leeps, setLeeps] = useState<Leep[]>([]);

  const createLeep = (leep: Leep) => {
    setLeeps([...leeps, leep]);
  };

  const updateLeep = (
    id: string,
    changes: Pick<Leep, "sleepTime" | "note">,
  ) => {
    const newLeeps = leeps.map((l) => (l.id === id ? { ...l, ...changes } : l));
    setLeeps(newLeeps);
  };

  return { leeps, createLeep, updateLeep };
};
