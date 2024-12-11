import { ElementOf } from "ts-essentials";
import { EvoRequirements, EvoRequirementsSchema } from "./evo-requirements";
import { z } from "zod";
import { ARMOR_EGGS, ArmorEgg } from "./armor-eggs";

type DigimonName = string;

export type ArmorInfo = {
  devolveFriendship: number;
  eggs: Record<ArmorEgg, ArmorEggEvo>;
}

export type ArmorEggEvo = {
  result: DigimonName;
  reqs: EvoRequirements;
};

/// this is what is stored in the evo_armor.json
export type ArmorInfoMap = Record<DigimonName, ArmorInfo>;

//# Validation

export const ArmorEggEvoSchema = z.object({
  result: z.string(),
  reqs: EvoRequirementsSchema,
}).strict() satisfies z.ZodSchema<ArmorEggEvo>;

export const ArmorInfoSchema = z.object({
  devolveFriendship: z.number().int(),
  eggs: z.record(z.string(), ArmorEggEvoSchema).refine((shape) => {
    return Object.keys(shape).every((key) => ARMOR_EGGS.includes(key as ArmorEgg));
  }),
}).strict() satisfies z.ZodSchema<ArmorInfo>;

export const ArmorInfoMapSchema =
  z.record(z.string(), ArmorInfoSchema) satisfies z.ZodSchema<ArmorInfoMap>;
