import { ElementOf } from "ts-essentials";

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
