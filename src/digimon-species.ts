import { ElementOf } from "ts-essentials";
import { z } from "zod";

export const DIGIMON_SPECIES = [
  'Holy',
  'Dark',
  'Dragon',
  'Beast',
  'Bird',
  'Machine',
  'Fish',
  'InsectPlant',
] as const;

export type DigimonSpecies = ElementOf<typeof DIGIMON_SPECIES>;

export const DigimonSpeciesSchema = z.enum(DIGIMON_SPECIES);
