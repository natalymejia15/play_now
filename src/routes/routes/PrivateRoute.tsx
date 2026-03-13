import SuperAdminDashboard from "@/pages/super-admin/SuperAdminDashboard";
import MallsManagement from "@/pages/super-admin/MallsManagement";
import MallDetails from "@/pages/super-admin/MallDetails";
import { DeportsDetails } from "@/pages/super-admin/DeportsDetails";

import AdminDashboard from "@/pages/admin/AdminDashboard";
import CourtsManagement from "@/pages/admin/CourtsManagement";
import CourtsDetailsPage from "@/pages/admin/CourtsDetails";
import HistoryAdmin from "@/pages/admin/HistoryAdmin";

import ClientHome from "@/pages/client/ClientHome";
import HistoricoReservasPage from "@/pages/client/HistoricoReservasPage";

import Profile from "@/pages/Profile";

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
    path: "/super-admin/mall/:id",
    element: <MallDetails />,
    allowedRoles: [1],
  },
  {
    path: "/super-admin/deports",
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
    path: "/admin/courts/:id",
    element: <CourtsDetailsPage />,
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
    element: <Profile />,
    allowedRoles: [1, 2, 3],
  },
];