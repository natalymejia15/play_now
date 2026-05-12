import { getAdminDashboardCourts } from "@/api";
import { useFetch } from "../useFetch";

export const useAdminDashboardCourts = () => {
  return useFetch(getAdminDashboardCourts);
};