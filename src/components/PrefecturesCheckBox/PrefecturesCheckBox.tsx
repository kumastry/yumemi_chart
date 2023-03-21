import React from "react";
import { type Prefectures } from "../../types/populationTypes";
import PrefectruesCheckBox from "./PrefecturesCheckBox.module.css";

interface Props {
  data: Prefectures | undefined;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PrefecturesCheckBox = ({
  data,
  handleChange,
}: Props): JSX.Element => {
  return (
    <>
      <form method="get">
        <ul className={PrefectruesCheckBox.ul}>
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
    </>
  );
};
