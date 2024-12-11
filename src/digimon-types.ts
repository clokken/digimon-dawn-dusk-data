import { ElementOf } from "ts-essentials";
import { z } from "zod";

export const DIGIMON_TYPES = [
  'Balance',
  'Attacker',
  'Tank',
  'Technical',
  'Speed',
  'HPType',
  'MPType',
] as const;

export type DigimonType = ElementOf<typeof DIGIMON_TYPES>;

export const DigimonTypeSchema = z.enum(DIGIMON_TYPES);
