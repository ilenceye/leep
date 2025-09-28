import * as v from "valibot";

export const LeepSchema = v.object({
  date: v.string(),
  wakeTime: v.optional(v.string()),
  sleepTime: v.optional(v.string()),
  note: v.optional(v.string()),
});

export type Leep = v.InferOutput<typeof LeepSchema>;

export type LeepMap = Map<string, Leep>;

export type Log = Required<Leep>;
