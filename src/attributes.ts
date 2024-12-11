import { ElementOf } from "ts-essentials";
import { z } from "zod";

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

export const AttributeSchema = z.enum(ATTRIBUTES);
