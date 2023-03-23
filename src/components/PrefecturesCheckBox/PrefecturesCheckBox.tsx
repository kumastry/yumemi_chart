import React from "react";
import { type Prefectures } from "../../types/populationTypes";
import PrefectruesCheckBox from "./PrefecturesCheckBox.module.css";
import { CheckBox } from "../UIs/CheckBox";

interface PrefecturesCheckBoxProps {
  data: Prefectures | undefined;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PrefecturesCheckBox = ({
  data,
  handleChange,
}: PrefecturesCheckBoxProps): JSX.Element => {
  return (
    <>
      <form method="get">
        <ul className={PrefectruesCheckBox.ul}>
          {data?.result.map((prefecture, key) => {
            return (
              <li key={key}>
                <CheckBox
                  id={String(prefecture.prefCode)}
                  value={prefecture.prefName}
                  text={prefecture.prefName}
                  handleChange={handleChange}
                />
              </li>
            );
          })}
        </ul>
      </form>
    </>
  );
};
