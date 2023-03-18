export interface PrefecturePopulationByYear {
  year: number;
  [prefecture: string]: number;
}

export type PopulationType = "total" | "young" | "workingAge" | "elderly";

export type PrefecturePopulationByYearWithType = {
  [key in PopulationType]: PrefecturePopulationByYear[];
};

export type PrefecturePopulationWithIdx = {
  [key in PopulationType]: 0 | 1 | 2 | 3;
};
