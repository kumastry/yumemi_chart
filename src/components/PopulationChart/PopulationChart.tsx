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
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

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
  return (
    <>
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
