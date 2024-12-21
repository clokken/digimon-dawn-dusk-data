export function normalizeDigimonName(digimonName: string) {
  return digimonName.toLowerCase().replace(/[\s\(\)]/g, '');
}
