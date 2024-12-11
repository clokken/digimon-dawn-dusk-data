import DIGIMON from "../data/digimon.json";
import EVO_LINES from "../data/evo_lines.json";
import EVO_DNA from "../data/evo_dna.json";
import EVO_ARMOR from "../data/evo_armor.json";
import TECHS from "../data/techs.json";
import TRAITS from "../data/traits.json";
import VERSION_EXCLUSIVES from "../data/version_exclusives.json";

import { Digimon, DigimonEvoLine, DigimonDnaInfoMap, ArmorInfoMap, TechInfo, TraitInfo, VersionExclusives } from ".";

//# export all json files (doing some hacks so that I have proper typings when importing)

export type DigimonJson = Digimon[];
export type EvoLinesJson = Record<string, DigimonEvoLine>;
export type EvoDnaJson = DigimonDnaInfoMap;
export type EvoArmorJson = ArmorInfoMap;
export type TechsJson = TechInfo[];
export type TraitsJson = TraitInfo[];
export type VersionExclusivesJson = VersionExclusives;

const TYPED_DIGIMON = DIGIMON as DigimonJson;
const TYPED_EVO_LINES = EVO_LINES as EvoLinesJson;
const TYPED_EVO_DNA = EVO_DNA as EvoDnaJson;
const TYPED_EVO_ARMOR = EVO_ARMOR as EvoArmorJson;
const TYPED_TECHS = TECHS as TechsJson;
const TYPED_TRAITS = TRAITS as TraitsJson;
const TYPED_VERSION_EXCLUSIVES = VERSION_EXCLUSIVES as VersionExclusivesJson;

export { TYPED_DIGIMON as DIGIMON };
export { TYPED_EVO_LINES as EVO_LINES };
export { TYPED_EVO_DNA as EVO_DNA };
export { TYPED_EVO_ARMOR as EVO_ARMOR };
export { TYPED_TECHS as TECHS };
export { TYPED_TRAITS as TRAITS };
export { TYPED_VERSION_EXCLUSIVES as VERSION_EXCLUSIVES };
