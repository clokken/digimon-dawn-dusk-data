import { ElementOf } from "ts-essentials";

export const DIGIMON_STAGES = [
  'In-Training',
  'Rookie',
  'Champion',
  'Ultimate',
  'Mega',
] as const;

export type DigimonStage = ElementOf<typeof DIGIMON_STAGES>;
