import { z } from "zod";
import { EvoRequirements, EvoRequirementsSchema } from "./evo-requirements";
import { ArmorEgg, ArmorEggSchema } from "./armor-eggs";

/// represents the name of a Digimon (either the fullName, shortName or altName)
type DigimonName = string;

export type PossibleDigimonPair = {
  digi1: DigimonName;
  digi2: DigimonName;
};

export type DnaEvoRequirements = {
  possibleDigimon: DigimonName[] | PossibleDigimonPair[];
  /// if true, the first digimon in the possibleDigimon array must be the first digimon selected
  fixedFirst?: boolean;
  /// these requirements only apply to the first digimon of the possibleDigimon array
  evoReqs: EvoRequirements;
};

export type DnaDegenerations = {
  target: DigimonName;
  neededDigimon: Array<{
    digimon: DigimonName;
    level?: number;
  }>;
  befriended?: DigimonName;
  hasEgg?: ArmorEgg;
};

export type DigimonDnaInfo = {
  // requirements to get into this digimon
  dnaReqs: DnaEvoRequirements;
  dnaEvolvesInto?: DigimonName[];
  dnaDegensInto: DnaDegenerations[];
};

/// this is what is stored in the evo_dna.json
export type DigimonDnaInfoMap = Record<DigimonName, DigimonDnaInfo>;

//# Validation

const PossibleDigimonSchema = z.object({
  digi1: z.string(),
  digi2: z.string(),
}).strict() satisfies z.ZodSchema<PossibleDigimonPair>;

export const DnaEvoRequirementsSchema = z.object({
  possibleDigimon: z.union([
    z.string().array(),
    PossibleDigimonSchema.array(),
  ]),
  fixedFirst: z.boolean().optional(),
  evoReqs: EvoRequirementsSchema,
}).strict() satisfies z.ZodSchema<DnaEvoRequirements>;

export const DnaDegenerationsSchema = z.object({
  target: z.string(),
  neededDigimon: z.array(z.object({
    digimon: z.string(),
    level: z.number().optional(),
  })),
  befriended: z.string().optional(),
  hasEgg: ArmorEggSchema.optional(),
}).strict() satisfies z.ZodSchema<DnaDegenerations>;

export const DigimonDnaInfoSchema = z.object({
  dnaReqs: DnaEvoRequirementsSchema,
  dnaEvolvesInto: z.string().array().optional(),
  dnaDegensInto: DnaDegenerationsSchema.array(),
}).strict() satisfies z.ZodSchema<DigimonDnaInfo>;

export const DigimonDnaInfoMapSchema =
  z.record(z.string(), DigimonDnaInfoSchema) satisfies z.ZodSchema<DigimonDnaInfoMap>;
