import { ElementOf } from "ts-essentials";

export const DIGIMON_SPECIES = [
  'Holy',
  'Dark',
  'Dragon',
  'Beast',
  'Bird',
  'Machine',
  'Aquan',
  'InsectPlant',
] as const;

export type DigimonSpecies = ElementOf<typeof DIGIMON_SPECIES>;
