import React from "react";

interface CheckBoxProps {
  id: string;
  value: string;
  text: string;
  isCheckBoxDisabled: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CheckBox = ({
  id,
  value,
  text,
  isCheckBoxDisabled,
  handleChange,
}: CheckBoxProps): JSX.Element => {
  return (
    <>
      <input
        type="checkbox"
        id={id}
        value={value}
        onChange={handleChange}
        disabled={isCheckBoxDisabled}
      />
      <label htmlFor={id}>{text}</label>
    </>
  );
};
