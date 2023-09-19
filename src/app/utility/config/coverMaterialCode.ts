const COVER_MATERIAL_CODE: Map<number, string> = new Map([
  [0, "Khác"],
  [1, "Tiếng việt"],
  [2, "Tiếng anh"],
]);

export function getCoverMaterialPhase(key: number): string {
  return COVER_MATERIAL_CODE.get(key) ?? "";
}
