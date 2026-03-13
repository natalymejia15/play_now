import { Auth } from "@/modules";
import ChangePassword from "@/pages/ChangePassword";
import ForgotPasswordForm from "@/pages/ForgotPasswordForm";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";

export const publicRoutes = [
    { path: '/', element: <Index /> },
    { path: '/login', element: <Auth /> },
    { path: "/forgot-password", element: <ForgotPasswordForm /> },
    { path: "/users/reset-password/:token", element: <ChangePassword /> },
    { path: '*', element: <NotFound /> },
]
