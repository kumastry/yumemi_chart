import React from "react";
import styles from "./Header.module.css";

export const Header = (): JSX.Element => {
  return (
    <>
      <h1 className={styles.h1}>都道府県別の人口推移グラフ</h1>
    </>
  );
};
