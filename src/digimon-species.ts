import { ElementOf } from "ts-essentials";

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
