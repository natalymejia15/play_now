import { getDashboardKpis } from "@/api";
import { useFetch } from "./useFetch";

export const useDashboardKpis = () => {
  return useFetch(getDashboardKpis);
};