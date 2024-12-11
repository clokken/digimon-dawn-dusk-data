import { Attribute } from "./attributes";
import { DigimonSpecies } from "./digimon-species";
import { DigimonStage } from "./digimon-stages";
import { DigimonType } from "./digimon-types";
import { GameVersion } from "./game-version";
import { TechLearned } from "./tech-learned";

export type Digimon = {
  id: number; // <- unique identifier
  exclusive?: GameVersion;
  fullName: string;
  shortName?: string;
  altNames?: string[];
  type: DigimonType;
  species: DigimonSpecies;
  stage: DigimonStage;
  strongAttr: Attribute;
  weakAttr: Attribute;
  habitat: string;
  maxHp: number;
  maxMp: number;
  attack: number;
  defense: number;
  spirit: number;
  speed: number;
  aptitude: number;
  traitNames: string[],
  techsLearned: TechLearned[];
  specialTech: TechLearned;
};
