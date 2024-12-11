import { Attribute } from "./attributes";

export type TechInfo = {
  name: string; // <- unique identifier
  desc: string;
  effect: number | null;
  mp: number;
  range: string;
  attribute: Attribute;
};
