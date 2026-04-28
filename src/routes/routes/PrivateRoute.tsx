import SuperAdminDashboard from "@/pages/super-admin/SuperAdminDashboard";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import HistoryAdmin from "@/pages/admin/HistoryAdmin";
import ClientHome from "@/pages/client/ClientHome";
import HistoricoReservasPage from "@/pages/client/HistoricoReservasPage";

import {  CourtsDetails, CourtsManagement, DeportsDetails, DeportsManagement, MallDetails, MallsManagement, ProfilePage } from "@/modules";

export const privateRoutes = [
  // SUPER ADMIN
  {
    path: "/super-admin/dashboard",
    element: <SuperAdminDashboard />,
    allowedRoles: [1],
  },
  {
    path: "/super-admin/malls",
    element: <MallsManagement />,
    allowedRoles: [1],
  },
  {
    path: "/super-admin/mall/details",
    element: <MallDetails />,
    allowedRoles: [1],
  },
  {
    path: "/super-admin/deports",
    element: <DeportsManagement />,
    allowedRoles: [1],
  },
  {
    path: "/super-admin/deports/details",
    element: <DeportsDetails />,
    allowedRoles: [1],
  },

  // ADMIN
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
    allowedRoles: [2],
  },
  {
    path: "/admin/courts",
    element: <CourtsManagement />,
    allowedRoles: [2],
  },
  {
    path: "/admin/courts/details",
    element: <CourtsDetails />,
    allowedRoles: [2],
  },
  {
    path: "/admin/history",
    element: <HistoryAdmin />,
    allowedRoles: [2],
  },

  // CLIENT
  {
    path: "/client/home",
    element: <ClientHome />,
    allowedRoles: [3],
  },
  {
    path: "/client/courts",
    element: <ClientHome />,
    allowedRoles: [3],
  },
  {
    path: "/client/historico",
    element: <HistoricoReservasPage />,
    allowedRoles: [3],
  },

  // GENERAL
  {
    path: "/profile",
    element: <ProfilePage />,
    allowedRoles: [1, 2, 3],
  },
];