import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import AuthPage from "./pages/Auth";
import SuperAdminDashboard from "./pages/super-admin/SuperAdminDashboard";
import UsersManagement from "./pages/super-admin/MallsManagement";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CourtsManagement from "./pages/admin/CourtsManagement";
import ClientHome from "./pages/client/ClientHome";
import NotFound from "./pages/NotFound";
import ForgotPasswordForm from "./pages/ForgotPasswordForm";
import ChangePassword from "./pages/ChangePassword";
import ProtectedRoute from "./routes/ProtectedRoute";
import Profile from "./pages/Profile";
import MallDetails from "./pages/super-admin/MallDetails";
import CrearReservasPage from "./pages/client/CrearReservaPage";
import HistoricoReservasPage from "./pages/client/HistoricoReservasPage";

function App() {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/src/assets/logo.png')" }}
    >
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordForm />} />
          <Route path="/users/reset-password/:token" element={<ChangePassword />} />
          <Route
            path="/super-admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={[1]}>
                <SuperAdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/super-admin/malls"
            element={
              <ProtectedRoute allowedRoles={[1]}>
                <UsersManagement />
              </ProtectedRoute>
            }
          />
           <Route
            path="/super-admin/mall/:id"
            element={
              <ProtectedRoute allowedRoles={[1]}>
                <MallDetails />
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
           <Route
            path="/client/courts"
            element={
              <ProtectedRoute allowedRoles={[3]}>
                <CrearReservasPage />
              </ProtectedRoute>
            }
          />
           <Route
            path="/client/historico"
            element={
              <ProtectedRoute allowedRoles={[3]}>
                <HistoricoReservasPage />
              </ProtectedRoute>
            }
          />
           <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </div>
  );
}

export default App;
