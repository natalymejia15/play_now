import { Route, Routes } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute"
import Dashboard from "./pages/Dashboard"
import { TooltipProvider } from "./components/ui/tooltip"
import { Toaster } from "./components/ui/toaster"
import { Toaster as Sonner } from "./components/ui/sonner";
import AuthPage from "./pages/Auth"
import SuperAdminDashboard from "./pages/super-admin/SuperAdminDashboard"
import UsersManagement from "./pages/super-admin/UsersManagement"
import AdminDashboard from "./pages/admin/AdminDashboard"
import CourtsManagement from "./pages/admin/CourtsManagement"
import ClientHome from "./pages/client/ClientHome"
import NotFound from "./pages/NotFound"

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          <Route path="/super-admin/dashboard" element={<SuperAdminDashboard />} />
          <Route path="/super-admin/users" element={<UsersManagement />} />
          
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/courts" element={<CourtsManagement />} />
          
          <Route path="/client/home" element={<ClientHome />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </TooltipProvider>

  )
}

export default App