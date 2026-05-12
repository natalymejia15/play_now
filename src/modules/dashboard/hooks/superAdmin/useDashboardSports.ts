import { getDashboardSports } from "@/api";
import { useFetch } from "./useFetch";

export const useDashboardSports = () => {
  return useFetch(getDashboardSports);
};