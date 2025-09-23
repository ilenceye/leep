import * as v from "valibot";

export const LeepSchema = v.object({
  date: v.string(),
  sleepTime: v.string(),
  note: v.optional(v.string()),
});

export type Leep = v.InferOutput<typeof LeepSchema>;

export type LeepMap = Map<string, Leep>;
