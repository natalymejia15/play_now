import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import AuthPage from "./pages/Auth";
import SuperAdminDashboard from "./pages/super-admin/SuperAdminDashboard";
import UsersManagement from "./pages/super-admin/UsersManagement";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CourtsManagement from "./pages/admin/CourtsManagement";
import ClientHome from "./pages/client/ClientHome";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/" element={<AuthPage />} />

        <Route
          path="/super-admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={[1]}>
              <SuperAdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/super-admin/users"
          element={
            <ProtectedRoute allowedRoles={[1]}>
              <UsersManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={[2]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/courts"
          element={
            <ProtectedRoute allowedRoles={[2]}>
              <CourtsManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/client/home"
          element={
            <ProtectedRoute allowedRoles={[3]}>
              <ClientHome />
            </ProtectedRoute>
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  );
}

export default App;
