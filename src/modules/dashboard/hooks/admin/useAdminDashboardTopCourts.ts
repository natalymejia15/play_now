import { getAdminDashboardTopCourts } from "@/api";
import { useFetch } from "../useFetch";

export const useAdminDashboardTopCourts = () => {
  return useFetch(getAdminDashboardTopCourts);
};