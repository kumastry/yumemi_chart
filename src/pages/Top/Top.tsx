import React from "react";
import { useFetchPrefectures } from '../../hooks/useFetchPrefectures';

export const Top = (): JSX.Element => {

  const {status, data} = useFetchPrefectures();
  const [prefectPopulation, setPrefectPopulation] = React.useState({});

  const handleChange = (e : any) => {
    console.log(e.target?.id);
    console.log(e.target?.value);
  }
  if(status === "loading") {
    return <div>Loading...</div>
  }

  if(status === "error") {
    return <div>Error</div>;
  }

  return(
    <>
    <form method = "get">
    <ul>
      {data?.result.map((prefecture) => {
        
        return (
          <li>
               <input type="checkbox" id={String(prefecture.prefCode)}  name={prefecture.prefName}  onChange={handleChange}/>
               <label htmlFor={String(prefecture.prefCode)}>{prefecture.prefName}</label>
          </li>
        );
      })}
    </ul>
    </form>
    </>
  );
};
