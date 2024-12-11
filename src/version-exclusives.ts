import { z } from "zod";

export type VersionExclusives = {
  dawn: string[];
  dusk: string[];
};

export const VersionExclusivesSchema = z.object({
  dawn: z.string().array(),
  dusk: z.string().array(),
}).strict() satisfies z.ZodSchema<VersionExclusives>;
