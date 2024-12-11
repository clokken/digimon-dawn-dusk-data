import { z } from "zod";
import { DigimonType, DigimonTypeSchema } from "./digimon-types";
import { DigimonSpecies, DigimonSpeciesSchema } from "./digimon-species";
import { DigimonStage, DigimonStageSchema } from "./digimon-stages";
import { Attribute, AttributeSchema } from "./attributes";
import { TechLearned, TechLearnedSchema } from "./tech-learned";
import { GameVersion } from "./game-version";

export type Digimon = {
  id: number; // <- unique identifier
  exclusive?: GameVersion;
  fullName: string;
  shortName?: string;
  altNames?: string[];
  type: DigimonType;
  species: DigimonSpecies;
  stage: DigimonStage;
  strongAttr: Attribute;
  weakAttr: Attribute;
  habitat: string;
  maxHp: number;
  maxMp: number;
  attack: number;
  defense: number;
  spirit: number;
  speed: number;
  aptitude: number;
  traitNames: string[],
  techsLearned: TechLearned[];
  specialTech: TechLearned;
};

export const DigimonSchema = z.object({
  id: z.number().int(),
  fullName: z.string(),
  shortName: z.string().optional(),
  altNames: z.string().array().optional(),
  type: DigimonTypeSchema,
  species: DigimonSpeciesSchema,
  stage: DigimonStageSchema,
  strongAttr: AttributeSchema,
  weakAttr: AttributeSchema,
  habitat: z.string(),
  maxHp: z.number().int(),
  maxMp: z.number().int(),
  attack: z.number().int(),
  defense: z.number().int(),
  spirit: z.number().int(),
  speed: z.number().int(),
  aptitude: z.number().int(),
  traitNames: z.string().array().max(4),
  techsLearned: TechLearnedSchema.array(),
  specialTech: TechLearnedSchema,
}).strict() satisfies z.ZodSchema<Digimon>;
