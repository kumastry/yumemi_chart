import React from "react";

interface CheckBoxProps {
  id: string;
  value: string;
  text: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CheckBox = ({
  id,
  value,
  text,
  handleChange,
}: CheckBoxProps): JSX.Element => {
  return (
    <>
      <input type="checkbox" id={id} value={value} onChange={handleChange} />
      <label htmlFor={id}>{text}</label>
    </>
  );
};
