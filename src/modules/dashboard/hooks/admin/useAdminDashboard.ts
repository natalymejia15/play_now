import { useAdminDashboardCourts } from "./useAdminDahsboardCourts";
import { useAdminDashboardDayStatus } from "./useAdminDashboardDayStatus";
import { useAdminDashboardKpis } from "./useAdminDashboardKpis";
import { useAdminDashboardReservations } from "./useAdminDashboardReservations";
import { useAdminDashboardTopCourts } from "./useAdminDashboardTopCourts";

export const useAdminDashboard = () => {
    const adminKpis = useAdminDashboardKpis();
    const courts = useAdminDashboardCourts();
    const reservations = useAdminDashboardReservations();
    const topCourts = useAdminDashboardTopCourts();
    const dayStatus = useAdminDashboardDayStatus();

    const loading = adminKpis.loading;

    return {
        adminKpis: adminKpis.data,
        courts: courts.data,
        reservations: reservations.data,
        topCourts: topCourts.data,
        dayStatus: dayStatus.data,
        loading,
        refetchAll: () => {
            adminKpis.refetch();
        },
    }
}