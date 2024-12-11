import { z } from "zod";

export type TraitInfo = {
  name: string; // <- unique identifier
  desc: string;
};

export const TraitInfoSchema = z.object({
  name: z.string(),
  desc: z.string(),
}).strict() satisfies z.ZodSchema<TraitInfo>;
