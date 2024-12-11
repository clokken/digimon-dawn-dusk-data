import { z } from "zod";

export type EvoRequirements = {
  level?: number;
  attack?: number;
  defense?: number;
  spirit?: number;
  speed?: number;
  aptitude?: number;
  friendship?: number;
  befriended?: string[];
  currentlyOwns?: string[];
  holyExp?: number;
  darkExp?: number;
  birdExp?: number;
  aquaExp?: number;
  dragonExp?: number;
  beastExp?: number;
  machineExp?: number;
  insectPlantExp?: number;
  totalExp?: number;
};

// for convenience
const _evoRequirementsAllProps = z.object({
  level: z.number().int(),
  attack: z.number().int(),
  defense: z.number().int(),
  spirit: z.number().int(),
  speed: z.number().int(),
  aptitude: z.number().int(),
  friendship: z.number().int(),
  befriended: z.string().array(),
  currentlyOwns: z.string().array(),
  holyExp: z.number().int(),
  darkExp: z.number().int(),
  birdExp: z.number().int(),
  aquaExp: z.number().int(),
  dragonExp: z.number().int(),
  beastExp: z.number().int(),
  machineExp: z.number().int(),
  insectPlantExp: z.number().int(),
  totalExp: z.number().int(),
}).strict() satisfies z.ZodSchema<Required<EvoRequirements>>;

export const EvoRequirementsSchema =
  _evoRequirementsAllProps.partial() satisfies z.ZodSchema<EvoRequirements>;
