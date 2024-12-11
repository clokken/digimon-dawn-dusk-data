import { ElementOf } from "ts-essentials";

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
