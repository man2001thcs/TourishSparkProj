export const CATEGORY_CODE: Map<string, string> = new Map([
  ["ECO_BusinessAdministration", "Quản trị kinh doanh"],
  ["ECO_BusinessManagement", "Quản lý kinh tế"],

  ["ENT_Comic", "Comic"],
  ["ENT_Manga", "Manga"],

  ["LIT_Novel", "Tiểu thuyết"],
  ["LIT_ShortStory", "Truyện ngắn"],

  ["SCH_FirstClass", "Sách giáo khoa lớp 1"],
  ["SCH_SecondClass", "Sách giáo khoa lớp 2"],
]);

export function getCategoryPhase(key: string): string{
  if (key !== ""){
    return CATEGORY_CODE.get(key) ?? "";
  } else return ""; 
}

