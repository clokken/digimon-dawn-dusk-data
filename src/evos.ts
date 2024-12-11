import { EvoRequirements } from "./evo-requirements";

/// represents the name of a Digimon (either the fullName, shortName or altName)
type DigimonName = string;

export type DigimonEvos = Record<DigimonName, EvoRequirements>;
export type DigimonEvoLine = Record<DigimonName, DigimonEvos>;

// examples:

const gummymonEvos: DigimonEvos = {
  "Terriermon": {
    "level": 9
  },
  "Tapirmon": {
    "level": 16,
    "holyExp": 470
  },
  "Renamon": {
    "level": 12,
    "speed": 70
  }
};

const terriermonEvos: DigimonEvos = {
  "Gargomon": {
    "level": 20,
    "friendship": 60,
    "beastExp": 480
  }
};

const gummymonLine: DigimonEvoLine = {
  'Gummymon': gummymonEvos,
  'Terriermon': terriermonEvos,
  // 'Gargomon': gargomonEvos,
  // 'Rapidmon': rapidmonEvos,
  // 'Tapirmon': tapirmonEvos,
  // 'Unimon': unimonEvos,
  // 'Pixiemon': pixiemonEvos,
  // 'Renamon': renamonEvos,
  // 'Kyubimon': kyubimonEvos,
  // 'Taomon': taomonEvos,
};
