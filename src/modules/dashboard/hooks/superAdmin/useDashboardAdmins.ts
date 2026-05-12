import { getDashboardAdmins } from "@/api";
import { useFetch } from "../useFetch";

export const useDashboardAdmins = () => {
  return useFetch(getDashboardAdmins);
};