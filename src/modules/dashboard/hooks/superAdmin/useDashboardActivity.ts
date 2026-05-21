import { getDashboardActivity } from "@/api";
import { useFetch } from "../useFetch";

export const useDashboardActivity = () => {
  return useFetch(getDashboardActivity);
};