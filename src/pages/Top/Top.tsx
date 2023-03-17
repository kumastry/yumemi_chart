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

export const Top = (): JSX.Element => {
  const { status, data } = useFetchPrefectures();
  const [prefecturePopulation, setPrefecturePopulation]: any = React.useState([]);

  const handleChange = (e: any): void => {
    const fetchPopulation = async (): Promise<void> => {
      const prefCode: string = e.target.id;

      if (e.target.checked as boolean) {
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
          setPrefecturePopulation(response.data.result.data);
        } catch (error) {
          console.log(error);
        }
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
          data={prefecturePopulation[0].data}
          margin={{
            top: 5,
            right: 5,
            left: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis dataKey="value" />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />

          <Legend />
          <Tooltip />
        </LineChart>
      )}
    </>
  );
};
