import React from "react";
import { useFetchPrefectures } from "../../hooks/useFetchPrefectures";

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

interface PrefecturePopulationByYear {
  year: number;
  [prefecture: string]: number;
}

export const Top = (): JSX.Element => {
  const { status, data } = useFetchPrefectures();
  // const [prefCodeState, setPrefCodeState] = React.useState("0");
  const [prefecturePopulation, setPrefecturePopulation] = React.useState<
    PrefecturePopulationByYear[]
  >([] as PrefecturePopulationByYear[]);

  const handleChange = (e: any): void => {
    const fetchPopulation = async (): Promise<void> => {
      const prefCode: string = e.target.id;

      if (e.target.checked as boolean) {
        //チェックボックスを付ける
        //prefecturePopulationに選択した都道府県を追加
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
          // setPrefCodeState(prefCode);
          const prefObject = response.data.result.data[0].data.map(
            (element: any, key: any) => {
              return {
                ...prefecturePopulation[key],
                year: element.year,
                [e.target.name]: element.value,
              };
            }
          );

          // console.log(prefObject);
          setPrefecturePopulation(prefObject);

          /* {
            year: 2020,
          } */
          /* const objectS = {...prefecturePopulation
          ,[prefCode]:response.data.result.data
        };
          setPrefecturePopulation(objectS);
          */
        } catch (error) {
          console.log(error);
        }
      } else {
        //チェックボックスを外す
        //prefecturePopulationに選択した都道府県を削除
        const tmpList: PrefecturePopulationByYear[] = [
          ...prefecturePopulation,
        ].map((element) => {
          const tmpMap = new Map(Object.entries(element));
          tmpMap.delete(e.target.name);

          const tmpObj: PrefecturePopulationByYear = {} as any;
          for (const [key, value] of tmpMap) {
            tmpObj[key] = value;
          }

          console.log(tmpObj);
          return tmpObj;
        });
        setPrefecturePopulation(tmpList);
      }
    };

    fetchPopulation().catch((err) => {
      console.log(err);
    });
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error</div>;
  }

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
                  value="checked"
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

      {prefecturePopulation.length === 0 || (
        <LineChart
          width={900}
          height={500}
          data={prefecturePopulation}
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
          {Object.keys(prefecturePopulation[0])
            .filter((pref) => {
              return pref !== "year";
            })
            .map((prefName, key) => {
              return (
                <Line
                  type="monotone"
                  dataKey={prefName}
                  stroke="#8884d8"
                  key={key}
                />
              );
            })}

          <Legend />
          <Tooltip />
        </LineChart>
      )}
    </>
  );
};
