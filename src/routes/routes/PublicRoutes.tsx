import { Auth, ChangePasswordForm, ForgotPasswordForm, NotFound, PagePrincipal } from "@/modules";

export const publicRoutes = [
    { path: '/', element: <PagePrincipal /> },
    { path: '/login', element: <Auth /> },
    { path: "/forgot-password", element: <ForgotPasswordForm /> },
    { path: "/users/reset-password/:token", element: <ChangePasswordForm /> },
    { path: '*', element: <NotFound /> },
]
