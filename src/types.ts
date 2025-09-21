import { z } from "zod";

export const LeepSchema = z.object({
  date: z.string(),
  sleepTime: z.string(),
  note: z.string().optional(),
});

export type Leep = z.infer<typeof LeepSchema>;

export type LeepMap = Map<string, Leep>;
