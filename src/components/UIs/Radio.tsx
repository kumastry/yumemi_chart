import React from "react";

interface RadioProps {
  value: string;
  text: string;
  checkedValue: string;
  handleRadioChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Radio = ({
  value,
  text,
  checkedValue,
  handleRadioChange,
}: RadioProps): JSX.Element => {
  return (
    <>
      <input
        type="radio"
        id={value}
        value={value}
        onChange={handleRadioChange}
        checked={checkedValue === value}
      />
      <label htmlFor={value}>{text}</label>
    </>
  );
};
