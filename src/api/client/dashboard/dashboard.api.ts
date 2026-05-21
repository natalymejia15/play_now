import { api } from "@/api";

export const getDashboardKpis = async () => {
  const { data } = await api.get("/admin/dashboard/kpis");
  return data.data;
};

export const getDashboardMalls = async () => {
  const { data } = await api.get("/admin/dashboard/malls");
  return data.data;
};

export const getDashboardSports = async () => {
  const { data } = await api.get("/admin/dashboard/sports");
  return data.data;
};

export const getDashboardAdmins = async () => {
  const { data } = await api.get("/admin/dashboard/admins");
  return data.data;
};

export const getDashboardActivity = async () => {
  const { data } = await api.get("/admin/dashboard/activity");
  return data.data;
};

export const getAdminDashboardKpis = async () => {
  const { data } = await api.get("/admin/dashboard/mall-kpis");
  return data.data;
};

export const getAdminDashboardCourts = async () => {
  const { data } = await api.get("/admin/dashboard/my-courts");
  return data.data;
};

export const getAdminDashboardReservations = async () => {
  const { data } = await api.get("/admin/dashboard/recent-reservations");
  return data.data;
};

export const getAdminDashboardTopCourts = async () => {
  const { data } = await api.get("/admin/dashboard/top-courts");
  return data.data;
};

export const getAdminDashboardDayStatus = async () => {
  const { data } = await api.get("/admin/dashboard/day-status");
  return data.data;
};