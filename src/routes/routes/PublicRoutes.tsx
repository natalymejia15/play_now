import { Auth,  ForgotPasswordForm, NotFound, PagePrincipal, RecoverPassword } from "@/modules";


export const publicRoutes = [
    { path: '/', element: <PagePrincipal /> },
    { path: '/login', element: <Auth /> },
    { path: "/forgot-password", element: <ForgotPasswordForm /> },
    { path: "/users/reset-password/:token", element: <RecoverPassword /> },
    { path: '*', element: <NotFound /> },
]
