import React from "react";
import type {
  PopulationCompositionType,
  PrefecturePopulationByYear,
  PrefecturePopulationByYearWithType,
  PrefecturePopulationWithIdx,
} from "../types/populationTypes";
import axios from "axios";

type handleChangeType = (e: any) => void;

export const useCheckBoxPrefectures = (
  poplationIdx: PrefecturePopulationWithIdx
): [PrefecturePopulationByYearWithType, handleChangeType] => {
  const [prefecturePopulation, setPrefecturePopulation] =
    React.useState<PrefecturePopulationByYearWithType>({} as any);

  const handleChange = (e: any): void => {
    const fetchPopulation = async (): Promise<void> => {
      const prefCode: string = e.target.id;

      if (e.target.checked as boolean) {
        // チェックボックスを付ける
        // prefecturePopulationに選択した都道府県を追加
        try {
          const response = await axios.get(
            `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCode}`,
            {
              headers: {
                "X-API-KEY": import.meta.env.VITE_API_KEY,
              },
            }
          );
          // console.log(response.data.result.data);

          const totalPopulation =
            response.data.result.data[poplationIdx.total].data;
          const youngPopulation =
            response.data.result.data[poplationIdx.young].data;
          const workingAgePopulation =
            response.data.result.data[poplationIdx.workingAge].data;
          const elderlyPopulation =
            response.data.result.data[poplationIdx.elderly].data;

          const total: PrefecturePopulationByYear[] = totalPopulation.map(
            (element: any, key: any) => {
              const obj =
                Object.keys(prefecturePopulation).length === 0
                  ? {}
                  : prefecturePopulation.total[key];
              return {
                ...obj,
                year: element.year,
                [e.target.name]: element.value,
              };
            }
          );

          const young = youngPopulation.map((element: any, key: any) => {
            const obj =
              Object.keys(prefecturePopulation).length === 0
                ? {}
                : prefecturePopulation.young[key];
            return {
              ...obj,
              year: element.year,
              [e.target.name]: element.value,
            };
          });

          const workingAge = workingAgePopulation.map(
            (element: any, key: any) => {
              const obj =
                Object.keys(prefecturePopulation).length === 0
                  ? {}
                  : prefecturePopulation.workingAge[key];
              return {
                ...obj,
                year: element.year,
                [e.target.name]: element.value,
              };
            }
          );

          const elderly = elderlyPopulation.map((element: any, key: any) => {
            const obj =
              Object.keys(prefecturePopulation).length === 0
                ? {}
                : prefecturePopulation.elderly[key];
            return {
              ...obj,
              year: element.year,
              [e.target.name]: element.value,
            };
          });

          setPrefecturePopulation({ total, young, workingAge, elderly });
        } catch (error) {
          console.log(error);
        }
      } else {
        // チェックボックスを外す
        // prefecturePopulationに選択した都道府県を削除
        const tmpObjWithType: PrefecturePopulationByYearWithType = {} as any;
        for (const [key, value] of Object.entries(
          prefecturePopulation
        ) as Array<[PopulationCompositionType, PrefecturePopulationByYear[]]>) {
          const populationList: PrefecturePopulationByYear[] = value.map(
            (element: PrefecturePopulationByYear, key: any) => {
              // element オブジェクトをMapに変換する
              const elementMap = new Map();
              Object.keys(element).forEach(function (key) {
                elementMap.set(key, element[key]);
              });

              // Mapから外したチェックの都道府県を取り除く
              elementMap.delete(e.target.name);
              // Mapからobjectに変換しながらreturn
              return Object.fromEntries(elementMap);
            }
          );

          tmpObjWithType[key] = populationList;
        }
        setPrefecturePopulation(tmpObjWithType);
      }
    };

    fetchPopulation().catch((err) => {
      console.log(err);
    });
  };
  return [prefecturePopulation, handleChange];
};