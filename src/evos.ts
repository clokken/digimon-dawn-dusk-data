/// represents the name of a Digimon (either the fullName, shortName or altName)
type DigimonName = string;

/// digimon -> digivolution options
export type DigimonEvoLine = Record<DigimonName, DigimonName[]>;
