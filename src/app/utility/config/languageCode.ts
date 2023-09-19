const LANGUAGE_CODE: Map<number, string> = new Map([
  [0, "Khác"],
  [1, "Tiếng việt"],
  [2, "Tiếng anh"],
]);

export function getLanguagePhase(key: number): string {
  return LANGUAGE_CODE.get(key) ?? "";
}
