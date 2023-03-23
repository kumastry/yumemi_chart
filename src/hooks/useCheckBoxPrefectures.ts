import React from "react";
import type {
  PopulationCompositionType,
  PrefecturePopulationByYear,
  PrefecturePopulationByYearWithType,
  PrefecturePopulationWithIdx,
} from "../types/populationTypes";
import axios from "axios";

type UseCheckBoxPrefectures = {
  prefecturePopulation: PrefecturePopulationByYearWithType;
  isCheckBoxDisabled: boolean;
  handleCheckBoxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const useCheckBoxPrefectures = (
  poplationIdx: PrefecturePopulationWithIdx,
  setIsError: any
): UseCheckBoxPrefectures => {
  const [prefecturePopulation, setPrefecturePopulation] =
    React.useState<PrefecturePopulationByYearWithType>({} as any);

  const [isCheckBoxDisabled, SetIsCheckBoxDisabled] = React.useState(false);

  const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const fetchPopulation = async (): Promise<void> => {
      const prefCode: string = event.target.id;
      if (event.target.checked) {
        // チェックボックスを付ける
        // prefecturePopulationに選択した都道府県を追加
        SetIsCheckBoxDisabled(true);
        const response = await axios.get(
          `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCode}`,
          {
            headers: {
              "X-API-KEY": import.meta.env.VITE_API_KEY,
            },
          }
        );
        SetIsCheckBoxDisabled(false);
        // console.log(response.data.result.data);
        // エラーが出ても200 okのところはここで例外を投げる
        if (response.data.statusCode === "403") {
          throw new Error("403 forbidden");
        }

        if (response.data.statusCode === "404") {
          throw new Error("404 Not Found");
        }

        const resData2Obj = (resData:any):PrefecturePopulationByYear[] => {
          return (
            resData.map(
              (item: any, key: number) => {
                const obj =
                  Object.keys(prefecturePopulation).length === 0
                    ? {}
                    : prefecturePopulation.total[key];
                return {
                  ...obj,
                  year: item.year,
                  [event.target.value]: item.value,
                };
              }
            )
          );
        }

        const total = resData2Obj(response.data.result.data[poplationIdx.total].data);
        const young = resData2Obj(response.data.result.data[poplationIdx.young].data);
        const workingAge = resData2Obj(response.data.result.data[poplationIdx.workingAge].data);
        const elderly = resData2Obj(response.data.result.data[poplationIdx.elderly].data);

        setPrefecturePopulation({ total, young, workingAge, elderly });
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
              elementMap.delete(event.target.value);
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
      setIsError(true);
      console.error(err);
    });
  };
  return {prefecturePopulation, handleCheckBoxChange, isCheckBoxDisabled};
};
