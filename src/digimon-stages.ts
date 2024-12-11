import { ElementOf } from "ts-essentials";
import { z } from "zod";

export const DIGIMON_STAGES = [
  'In-Training',
  'Rookie',
  'Champion',
  'Ultimate',
  'Mega',
] as const;

export type DigimonStage = ElementOf<typeof DIGIMON_STAGES>;

export const DigimonStageSchema = z.enum(DIGIMON_STAGES);
