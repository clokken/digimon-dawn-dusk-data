import DIGIMON from "../data/digimon.json";
import EVO_LINES from "../data/evo_lines.json";
import EVO_DNA from "../data/evo_dna.json";
import EVO_ARMOR from "../data/evo_armor.json";
import TECHS from "../data/techs.json";
import TRAITS from "../data/traits.json";
import VERSION_EXCLUSIVES from "../data/version_exclusives.json";

// export all json files
export {
  DIGIMON,
  EVO_LINES,
  EVO_DNA,
  EVO_ARMOR,
  TECHS,
  TRAITS,
  VERSION_EXCLUSIVES,
};

// export all types
export * from "./armor-eggs";
export * from "./armor-evos";
export * from "./attributes";
export * from "./digimon-species";
export * from "./digimon-stages";
export * from "./digimon-types";
export * from "./digimon";
export * from "./dna-evos";
export * from "./evo-requirements";
export * from "./evos";
export * from "./game-version";
export * from "./tech-info";
export * from "./tech-learned";
export * from "./trait-info";
export * from "./version-exclusives";
