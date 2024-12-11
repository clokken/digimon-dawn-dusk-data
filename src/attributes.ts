import { ElementOf } from "ts-essentials";

export const ATTRIBUTES = [
  'Light',
  'Dark',
  'Water',
  'Fire',
  'Earth',
  'Wind',
  'Thunder',
  'Steel',
] as const;

export type Attribute = ElementOf<typeof ATTRIBUTES>;
