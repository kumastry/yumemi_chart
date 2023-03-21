import React from "react";
import { type PopulationCompositionType } from "../../types/populationTypes";
import styles from "./PopulationCompositionRadio.module.css";

const populationCmp = [
  { value: "total", text: "総人口" },
  { value: "young", text: "年少人口" },
  { value: "workingAge", text: "生産年齢人口" },
  { value: "elderly", text: "老年人口" },
];

interface Props {
  populationComposition: PopulationCompositionType;
  setPopulationComposition: React.Dispatch<
    React.SetStateAction<PopulationCompositionType>
  >;
}

export const PopulationCompositionRadio = ({
  populationComposition,
  setPopulationComposition,
}: Props): JSX.Element => {
  return (
    <fieldset className={styles.fieldset}>
      <legend>人口構成:</legend>

      {populationCmp.map((item, index) => {
        return (
          <div key={index}>
            <input
              type="radio"
              id={item.value}
              value={item.value}
              onChange={(e: any) => {
                setPopulationComposition(e.target.value);
              }}
              checked={populationComposition === item.value}
            />
            <label htmlFor={item.value}>{item.text}</label>
          </div>
        );
      })}
    </fieldset>
  );
};
