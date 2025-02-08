import { ArmorEgg } from "./armor-eggs";
import { EvoRequirements } from "./evo-requirements";

/// represents the name of a Digimon (either the fullName, shortName or altName)
type DigimonName = string;

export type PossibleDigimonPair = {
  digi1: DigimonName;
  digi2: DigimonName;
};

export type DnaEvoRequirements = {
  possibleDigimon: DigimonName[] | PossibleDigimonPair[];
  /// if true, the first digimon in the possibleDigimon array must be the first digimon selected
  fixedFirst?: boolean;
  /// these requirements only apply to the first digimon of the possibleDigimon array
  evoReqs: EvoRequirements;
};

export type DnaDegeneration = {
  target: DigimonName;
  neededDigimon: Array<{
    digimon: DigimonName;
    level?: number;
  }>;
  befriended?: DigimonName;
  hasEgg?: ArmorEgg;
};

export type DigimonDnaInfo = {
  // requirements to get into this digimon
  dnaReqs: DnaEvoRequirements;
  dnaEvolvesInto?: DigimonName[];
  dnaDegensInto: DnaDegeneration[];
};

/// this is what is stored in the evo_dna.json
export type DigimonDnaInfoMap = Record<DigimonName, DigimonDnaInfo>;
