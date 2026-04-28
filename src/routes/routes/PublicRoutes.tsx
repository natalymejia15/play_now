import { Auth } from "@/modules";
import { PagePrincipal } from "@/modules/index/page";
import ChangePassword from "@/pages/ChangePassword";
import ForgotPasswordForm from "@/pages/ForgotPasswordForm";
import NotFound from "@/pages/NotFound";

export const publicRoutes = [
    { path: '/', element: <PagePrincipal /> },
    { path: '/login', element: <Auth /> },
    { path: "/forgot-password", element: <ForgotPasswordForm /> },
    { path: "/users/reset-password/:token", element: <ChangePassword /> },
    { path: '*', element: <NotFound /> },
]
