import { z } from "zod";
import { DIGIMON, TECHS, TRAITS, EVO_LINES, EVO_DNA, VERSION_EXCLUSIVES, EVO_ARMOR } from "..";
import { DigimonSchema } from "../digimon";
import { TechInfoSchema } from "../tech-info";
import { TraitInfoSchema } from "../trait-info";
import { DigimonEvoLineSchema } from "../evos";
import { DigimonDnaInfoMapSchema } from "../dna-evos";
import { VersionExclusivesSchema } from "../version-exclusives";
import { ArmorInfoMapSchema } from "../armor-evos";

function validate() {
  // 1. Validate json structures

  const digimons = DigimonSchema.array().parse(DIGIMON);
  const techs = TechInfoSchema.array().parse(TECHS);
  const traits = TraitInfoSchema.array().parse(TRAITS);
  const evoLines = z.record(z.string(), DigimonEvoLineSchema).parse(EVO_LINES);
  const evoDna = DigimonDnaInfoMapSchema.parse(EVO_DNA); // TODO validate
  const versionExclusives = VersionExclusivesSchema.parse(VERSION_EXCLUSIVES); // TODO validate
  const evoArmors = ArmorInfoMapSchema.parse(EVO_ARMOR); // TODO validate

  const normalizeDigimonName = (digimonName: string) => {
    return digimonName.toLowerCase().replace(/[\s\(\)]/g, '');
  };

  // key = id; value = names (normalized)
  const registry: Record<number, string[]> = {};

  const addIdToRegistry = (id: number) => {
    if (id in registry) throw new Error(`Duplicate ID: ${id}`);
    registry[id] = [];
  };

  const addNameToRegistry = (name: string, id: number, isAltName: boolean) => {
    const normName = normalizeDigimonName(name);

    for (const [_otherId, otherNames] of Object.entries(registry)) {
      const otherId = +_otherId;

      if (otherNames.includes(normName)) {
        if (otherId === id) {
          if (isAltName) {
            throw new Error(`Redundant alt name: ${name}`);
          }

          return;
        }

        throw new Error(`Duplicate digimon name: ${name}`);
      }
    }

    registry[id].push(normName);
  };

  const checkDigimonName = (digimonName: string) => {
    const normName = normalizeDigimonName(digimonName);

    let exists = false;

    for (const names of Object.values(registry)) {
      if (names.includes(normName)) {
        exists = true;
        break;
      }
    }

    if (!exists) {
      throw new Error(`Unknown digimon name: ${digimonName}`);
    }
  };

  // 2. Validate if all unique fields are unique

  for (let { id, fullName, shortName, altNames } of digimons) {
    addIdToRegistry(id);

    fullName = normalizeDigimonName(fullName);
    addNameToRegistry(fullName, id, false);

    if (shortName !== undefined) {
      shortName = normalizeDigimonName(shortName);
      addNameToRegistry(shortName, id, false);
    }

    if (altNames !== undefined) {
      altNames = altNames.map(normalizeDigimonName);
      altNames.forEach((altName) => addNameToRegistry(altName, id, true));
    }
  }

  const allTechNames: string[] = [];

  for (const { name } of techs) {
    addToUniqueArray(allTechNames, name, 'tech name');
  }

  const allTraitNames: string[] = [];

  for (const { name } of traits) {
    addToUniqueArray(allTraitNames, name, 'trait name');
  }

  // 3. Validate "foreign keys"

  //## validate digimons

  for (const { techsLearned, specialTech, traitNames } of digimons) {
    for (const techLearned of techsLearned) {
      if (!allTechNames.includes(techLearned.name)) {
        throw new Error(`Unregistered tech name: ${techLearned.name}`);
      }
    }

    if (!allTechNames.includes(specialTech.name)) {
      throw new Error(`Unregistered tech name: ${specialTech.name}`);
    }

    for (const traitName of traitNames) {
      if (!allTraitNames.includes(traitName)) {
        throw new Error(`Unregistered trait name: ${traitName}`);
      }
    }
  }

  //## validate evoLines

  for (const [_lineName, evoLine] of Object.entries(evoLines)) {
    for (const [digimonName, evos] of Object.entries(evoLine)) {
      checkDigimonName(digimonName);

      for (const [evoDigimonName, reqs] of Object.entries(evos)) {
        checkDigimonName(evoDigimonName);

        if (reqs.befriended !== undefined) {
          reqs.befriended.forEach(checkDigimonName);
        }

        if (reqs.currentlyOwns !== undefined) {
          reqs.currentlyOwns.forEach(checkDigimonName);
        }
      }
    }
  }

  //## validate versionExclusives

  (['dawn', 'dusk'] as const).forEach((game) => {
    const digimonList = versionExclusives[game];
    const otherList = game === 'dawn' ? versionExclusives['dusk'] : versionExclusives['dawn'];

    for (const digimon of digimonList) {
      checkDigimonName(digimon);

      if (otherList.includes(digimon)) {
        throw new Error(`Digimon can't be an exclusive in both versions: ${digimon}`);
      }
    }
  });

  //## validate evoArmors

  for (const [digimon, info] of Object.entries(evoArmors)) {
    checkDigimonName(digimon);

    for (const evo of Object.values(info.eggs)) {
      checkDigimonName(evo.result);

      if (evo.reqs.befriended !== undefined) {
        evo.reqs.befriended.forEach(checkDigimonName);
      }

      if (evo.reqs.currentlyOwns !== undefined) {
        evo.reqs.currentlyOwns.forEach(checkDigimonName);
      }
    }
  }

  //## validate evoDna

  for (const [digimonName, info] of Object.entries(evoDna)) {
    checkDigimonName(digimonName);

    info.dnaReqs.possibleDigimon.forEach((next) => {
      if (typeof next === 'string') {
        checkDigimonName(next);
      } else {
        checkDigimonName(next.digi1);
        checkDigimonName(next.digi2);
      }
    });

    if (info.dnaReqs.evoReqs.befriended !== undefined)
      info.dnaReqs.evoReqs.befriended.forEach(checkDigimonName);
    if (info.dnaReqs.evoReqs.currentlyOwns !== undefined)
      info.dnaReqs.evoReqs.currentlyOwns.forEach(checkDigimonName);

    if (info.dnaEvolvesInto !== undefined)
      info.dnaEvolvesInto.forEach(checkDigimonName);

    info.dnaDegensInto.forEach((degensInto) => {
      checkDigimonName(degensInto.target);
      degensInto.neededDigimon.forEach(({ digimon }) => checkDigimonName(digimon));
      if (degensInto.befriended !== undefined) checkDigimonName(degensInto.befriended);
    });
  }

  console.log('All good!');
}

try {
  validate();
} catch (err) {
  console.error('Validation failed:');
  console.error(err);
}

// Helper functions:

function addToUniqueArray<T>(
  arr: T[],
  valueOrValues: NonNullable<T> | NonNullable<T>[],
  valueCategoryName: string,
  ignoreDuplicate = false,
) {
  if (Array.isArray(valueOrValues)) {
    for (const value of valueOrValues) {
      addToUniqueArray(arr, value, valueCategoryName);
    }
    return;
  }

  const value = valueOrValues;

  if (arr.includes(value)) {
    if (ignoreDuplicate) return;

    throw new Error(`Duplicate ${valueCategoryName}: ${value}`);
  }

  arr.push(value);
}
