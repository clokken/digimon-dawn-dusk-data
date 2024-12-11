import { ElementOf } from "ts-essentials";
import { z } from "zod";

export const ARMOR_EGGS = [
  'courage',
  'friendship',
  'honesty',
  'kindness',
  'light',
  'love',
  'miracles',
  'purity',
] as const;

export type ArmorEgg = ElementOf<typeof ARMOR_EGGS>;

export const ArmorEggSchema = z.enum(ARMOR_EGGS) satisfies z.ZodSchema<ArmorEgg>;
