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
  const [isError, setIsError] = React.useState<boolean>(false);

  const { prefecturePopulation, handleCheckBoxChange, isCheckBoxDisabled } =
    useCheckBoxPrefectures(poplationIdx, setIsError);

  const prefectureColor: PrefectureColor = prefColor;

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error" || isError) {
    return <div>予期せぬエラーが発生しました</div>;
  }

  console.log(prefecturePopulation);
  return (
    <div>
      <section>
        <PrefecturesCheckBox
          data={data}
          handleChange={handleCheckBoxChange}
          isCheckBoxDisabled={isCheckBoxDisabled}
        />
      </section>

      <section>
        <PopulationCompositionRadio
          populationComposition={populationComposition}
          setPopulationComposition={setPopulationComposition}
        />
      </section>

      <section>
        <PopulationChart
          prefecturePopulation={prefecturePopulation}
          populationComposition={populationComposition}
          prefectureColor={prefectureColor}
        />
      </section>
    </div>
  );
};
