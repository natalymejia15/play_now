import { useAdminDashboardKpis } from "./useAdminDashboardKpis";

export const useAdminDashboard = () => {
    const adminKpis = useAdminDashboardKpis();

    const loading = adminKpis.loading;

    return {
        adminKpis: adminKpis.data,
        loading,
        refetchAll: () => {
            adminKpis.refetch();
        },
    }
}