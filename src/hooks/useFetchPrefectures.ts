import { useQuery } from "react-query";
import axios from "axios";
import type { UseQueryResult } from "react-query";
import type { Prefectures } from "../types/populationTypes";

const fetchPrefectures = async (): Promise<Prefectures> => {
  const PrefectureData = await axios.get(
    "https://opendata.resas-portal.go.jp/api/v1/prefectures",
    {
      headers: {
        "X-API-KEY": import.meta.env.VITE_API_KEY,
      },
    }
  );

  return PrefectureData.data;
};

export const useFetchPrefectures = (): UseQueryResult<Prefectures, Error> => {
  return useQuery<Prefectures, Error>(["prefectures"], fetchPrefectures);
};
