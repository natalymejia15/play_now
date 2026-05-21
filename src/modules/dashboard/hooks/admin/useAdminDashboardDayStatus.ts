import { getAdminDashboardDayStatus } from "@/api";
import { useFetch } from "../useFetch";

export const useAdminDashboardDayStatus = () => {
  return useFetch(getAdminDashboardDayStatus);
};