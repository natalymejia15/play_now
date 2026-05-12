import { getDashboardMalls } from "@/api";
import { useFetch } from "./useFetch";

export const useDashboardMalls = () => {
  return useFetch(getDashboardMalls);
};