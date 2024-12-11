import { z } from "zod";
import { Attribute, AttributeSchema } from "./attributes";

export type TechInfo = {
  name: string; // <- unique identifier
  desc: string;
  effect: number | null;
  mp: number;
  range: string;
  attribute: Attribute;
};

export const TechInfoSchema = z.object({
  name: z.string(),
  desc: z.string(),
  effect: z.number().int().nullable(),
  mp: z.number().int(),
  attribute: AttributeSchema,
  range: z.string().length(5).refine((val) => {
    return val.split('').every((char) => char === '.' || char === 'o' || char === 'O');
  }, { message: 'Range can only contain these characters: .oO' }),
}).strict() satisfies z.ZodSchema<TechInfo>;
