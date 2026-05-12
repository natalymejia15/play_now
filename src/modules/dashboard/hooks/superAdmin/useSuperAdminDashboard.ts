import { useDashboardActivity } from "./useDashboardActivity";
import { useDashboardAdmins } from "./useDashboardAdmins";
import { useDashboardKpis } from "./useDashboardKpis";
import { useDashboardMalls } from "./useDashboardMalls";
import { useDashboardSports } from "./useDashboardSports";

export const useSuperAdminDashboard = () => {
  const kpis = useDashboardKpis();
  const malls = useDashboardMalls();
  const sports = useDashboardSports();
  const admins = useDashboardAdmins();
  const activity = useDashboardActivity();

  const loading =
    kpis.loading ||
    malls.loading ||
    sports.loading ||
    admins.loading ||
    activity.loading;

  return {
    kpis: kpis.data,
    malls: malls.data,
    sports: sports.data,
    admins: admins.data,
    activity: activity.data,
    loading,
    refetchAll: () => {
      kpis.refetch();
      malls.refetch();
      sports.refetch();
      admins.refetch();
      activity.refetch();
    },
  };
};