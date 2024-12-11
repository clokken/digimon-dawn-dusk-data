import { ArmorEgg } from "./armor-eggs";
import { EvoRequirements } from "./evo-requirements";

type DigimonName = string;

export type ArmorInfo = {
  devolveFriendship: number;
  eggs: Record<ArmorEgg, ArmorEggEvo>;
}

export type ArmorEggEvo = {
  result: DigimonName;
  reqs: EvoRequirements;
};

/// this is what is stored in the evo_armor.json
export type ArmorInfoMap = Record<DigimonName, ArmorInfo>;
