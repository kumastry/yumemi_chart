export interface PrefecturePopulationByYear {
  year: number;
  [prefecture: string]: number;
}

export type PopulationCompositionType =
  | "total"
  | "young"
  | "workingAge"
  | "elderly";

export type PrefecturePopulationByYearWithType = Record<
  PopulationCompositionType,
  PrefecturePopulationByYear[]
>;

export type PrefecturePopulationWithIdx = Record<
  PopulationCompositionType,
  0 | 1 | 2 | 3
>;

export interface Prefecture {
  prefCode: number;
  prefName: string;
}

export interface Prefectures {
  message: string | null;
  result: Prefecture[];
}
