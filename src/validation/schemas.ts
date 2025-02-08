import { z } from "zod";
import { ARMOR_EGGS, ArmorEgg } from "../armor-eggs";
import { ArmorEggEvo, ArmorInfo, ArmorInfoMap } from "../armor-evos";
import { ATTRIBUTES } from "../attributes";
import { Digimon } from "../digimon";
import { DIGIMON_SPECIES } from "../digimon-species";
import { DIGIMON_STAGES } from "../digimon-stages";
import { DIGIMON_TYPES } from "../digimon-types";
import { PossibleDigimonPair, DnaEvoRequirements, DnaDegeneration, DigimonDnaInfo, DigimonDnaInfoMap } from "../dna-evos";
import { EvoRequirements } from "../evo-requirements";
import { TechInfo } from "../tech-info";
import { TechLearned } from "../tech-learned";
import { TraitInfo } from "../trait-info";
import { VersionExclusives } from "../version-exclusives";
import { DigimonEvoLine } from "../evos";

//# armor-eggs

export const ArmorEggSchema = z.enum(ARMOR_EGGS) satisfies z.ZodSchema<ArmorEgg>;

//# evo-requirements

const _evoRequirementsAllProps = z.object({ // for convenience
  level: z.number().int(),
  attack: z.number().int(),
  defense: z.number().int(),
  spirit: z.number().int(),
  speed: z.number().int(),
  aptitude: z.number().int(),
  friendship: z.number().int(),
  befriended: z.string().array(),
  currentlyOwns: z.string().array(),
  holyExp: z.number().int(),
  darkExp: z.number().int(),
  birdExp: z.number().int(),
  aquaExp: z.number().int(),
  dragonExp: z.number().int(),
  beastExp: z.number().int(),
  machineExp: z.number().int(),
  insectPlantExp: z.number().int(),
  totalExp: z.number().int(),
}).strict() satisfies z.ZodSchema<Required<EvoRequirements>>;

export const EvoRequirementsSchema =
  _evoRequirementsAllProps.partial() satisfies z.ZodSchema<EvoRequirements>;

//# armor-evos

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

//# attributes

export const AttributeSchema = z.enum(ATTRIBUTES);

//# digimon-species

export const DigimonSpeciesSchema = z.enum(DIGIMON_SPECIES);

//# digimon-stages

export const DigimonStageSchema = z.enum(DIGIMON_STAGES);

//# digimon-types

export const DigimonTypeSchema = z.enum(DIGIMON_TYPES);

//# tech-learned

export const TechLearnedSchema = z.object({
  name: z.string(),
  level: z.number().int(),
}).strict() satisfies z.ZodSchema<TechLearned>;

//# digimon

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
  evoReqs: EvoRequirementsSchema.optional(),
}).strict() satisfies z.ZodSchema<Digimon>;

//# dna-evos

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
}).strict() satisfies z.ZodSchema<DnaDegeneration>;

export const DigimonDnaInfoSchema = z.object({
  dnaReqs: DnaEvoRequirementsSchema,
  dnaEvolvesInto: z.string().array().optional(),
  dnaDegensInto: DnaDegenerationsSchema.array(),
}).strict() satisfies z.ZodSchema<DigimonDnaInfo>;

export const DigimonDnaInfoMapSchema =
  z.record(z.string(), DigimonDnaInfoSchema) satisfies z.ZodSchema<DigimonDnaInfoMap>;

//# evos

export const DigimonEvoLineSchema = z.record(z.string(), z.string().array()) satisfies z.ZodSchema<DigimonEvoLine>;

//# tech-info

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

//# trait-info

export const TraitInfoSchema = z.object({
  name: z.string(),
  desc: z.string(),
}).strict() satisfies z.ZodSchema<TraitInfo>;

//# version-exclusives

export const VersionExclusivesSchema = z.object({
  dawn: z.string().array(),
  dusk: z.string().array(),
}).strict() satisfies z.ZodSchema<VersionExclusives>;
