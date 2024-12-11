import { z } from "zod";

export type TechLearned = {
  name: string;
  level: number;
};

export const TechLearnedSchema = z.object({
  name: z.string(),
  level: z.number().int(),
}).strict() satisfies z.ZodSchema<TechLearned>;
