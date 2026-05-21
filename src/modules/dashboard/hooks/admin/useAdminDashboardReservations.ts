import { getAdminDashboardReservations } from "@/api";
import { useFetch } from "../useFetch";

export const useAdminDashboardReservations = () => {
  return useFetch(getAdminDashboardReservations);
};