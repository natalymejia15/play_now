import { getAdminDashboardKpis } from "@/api";
import { useFetch } from "../useFetch";

export const useAdminDashboardKpis = () => {
  return useFetch(getAdminDashboardKpis);
};