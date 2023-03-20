import React from "react";
import { useFetchPrefectures } from "../../hooks/useFetchPrefectures";
import { useCheckBoxPrefectures } from "../../hooks/useCheckBoxPrefectures";
import prefColor from "../../assets/prefColor.json";

import { PopulationChart } from "../../components/PopulationChart";
import { PopulationCompositionRadio } from "../../components/PopulationCompositionRadio";
import { PrefecturesCheckBox } from "../../components/PrefecturesCheckBox";

import type {
  PopulationCompositionType,
  PrefecturePopulationWithIdx,
} from "../../types/populationTypes";

export const Top = (): JSX.Element => {
  const { status, data } = useFetchPrefectures();
  const [populationComposition, setPopulationComposition] =
    React.useState<PopulationCompositionType>("total");
  const poplationIdx: PrefecturePopulationWithIdx = {
    total: 0,
    young: 1,
    workingAge: 2,
    elderly: 3,
  };

  const [prefecturePopulation, handleChange] =
    useCheckBoxPrefectures(poplationIdx);

  const prefectureColor: PrefectureColor = prefColor;


  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error</div>;
  }

  console.log(prefecturePopulation);
  return (
    <>
      <PrefecturesCheckBox data={data} handleChange={handleChange} />
      <PopulationCompositionRadio
        populationComposition={populationComposition}
        setPopulationComposition={setPopulationComposition}
      />
      <PopulationChart
        prefecturePopulation={prefecturePopulation}
        populationComposition={populationComposition}
        prefectureColor={prefectureColor}
      />
    </>
  );
};
