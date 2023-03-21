import React from "react";

import {
  type PopulationCompositionType,
  type PrefecturePopulationByYearWithType,
} from "../../types/populationTypes";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useResponsiveGraphAspectRatio } from "../../hooks/useResponsiveGraphAspectRatio";

interface Props {
  prefecturePopulation: PrefecturePopulationByYearWithType;
  populationComposition: PopulationCompositionType;
  prefectureColor: PrefectureColor;
}

export const PopulationChart = ({
  prefecturePopulation,
  populationComposition,
  prefectureColor,
}: Props): JSX.Element => {
  const graphAspectRatio = useResponsiveGraphAspectRatio();
  return (
    <>
      <ResponsiveContainer width="100%" aspect={graphAspectRatio}>
        <LineChart
          data={prefecturePopulation[populationComposition]?.filter(
            (item) => item.year <= 2020
          )}
          margin={{
            top: 50,
            right: 15,
            left: 30,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" type="number" domain={[1960, 2020]} />
          <YAxis type="number" domain={[0, "auto"]} />
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
      </ResponsiveContainer>
    </>
  );
};
