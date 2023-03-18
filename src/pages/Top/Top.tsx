import React from "react";
import { useFetchPrefectures } from "../../hooks/useFetchPrefectures";
import prefColor from "../../assets/prefColor.json";

import axios from "axios";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type {
  PrefecturePopulationByYear,
  PopulationCompositionType,
  PrefecturePopulationByYearWithType,
  PrefecturePopulationWithIdx,
} from "../../types/populationTypes";

export const Top = (): JSX.Element => {
  const { status, data } = useFetchPrefectures();

  const [prefecturePopulation, setPrefecturePopulation] =
    React.useState<PrefecturePopulationByYearWithType>({} as any);
  const [populationComposition, setPopulationComposition] =
    React.useState<PopulationCompositionType>("total");
  const poplationIdx: PrefecturePopulationWithIdx = {
    total: 0,
    young: 1,
    workingAge: 2,
    elderly: 3,
  };

  const prefectureColor: PrefectureColor = prefColor;

  // console.log(prefecturePopulation);
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

  const radioChange = (e: any): void => {
    setPopulationComposition(e.target.id);
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error</div>;
  }

  console.log(prefecturePopulation);
  return (
    <>
      <form method="get">
        <ul>
          {data?.result.map((prefecture, key) => {
            return (
              <li key={key}>
                <input
                  type="checkbox"
                  id={String(prefecture.prefCode)}
                  name={prefecture.prefName}
                  onChange={handleChange}
                />
                <label htmlFor={String(prefecture.prefCode)}>
                  {prefecture.prefName}
                </label>
              </li>
            );
          })}
        </ul>
      </form>

      <fieldset>
        <legend>人口構成:</legend>

        <div>
          <input
            type="radio"
            id="total"
            onChange={radioChange}
            checked={populationComposition === "total"}
          />
          <label htmlFor="total">総人口</label>
        </div>

        <div>
          <input
            type="radio"
            id="young"
            onChange={radioChange}
            checked={populationComposition === "young"}
          />
          <label htmlFor="young">年少人口</label>
        </div>

        <div>
          <input
            type="radio"
            id="workingAge"
            onChange={radioChange}
            checked={populationComposition === "workingAge"}
          />
          <label htmlFor="workingAge">生産年齢人口</label>
        </div>

        <div>
          <input
            type="radio"
            id="elderly"
            onChange={radioChange}
            checked={populationComposition === "elderly"}
          />
          <label htmlFor="elderly">老年人口</label>
        </div>
      </fieldset>

      <LineChart
        width={900}
        height={500}
        data={prefecturePopulation[populationComposition]}
        margin={{
          top: 35,
          right: 35,
          left: 35,
          bottom: 35,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis dataKey="value" type="number" domain={[0, 15000000]} />
        {Object.keys(prefecturePopulation).length === 0 ||
          Object.keys(prefecturePopulation[populationComposition][0])
            .filter((pref) => {
              return pref !== "year";
            })
            .map((prefName, key) => {
              return (
                <Line
                  type="monotone"
                  dataKey={prefName}
                  stroke={prefectureColor[prefName]}
                  key={key}
                  isAnimationActive={false}
                />
              );
            })}

        <Legend />
        <Tooltip />
      </LineChart>
    </>
  );
};
