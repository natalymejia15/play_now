import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const userCtx = useContext(UserContext);

    if (!userCtx) {
        throw new Error("ProtectedRoute debe esatar dentro de UserProvider");
    }

    const { user } = userCtx;

    if (!user) {
        return <Navigate to="/login" replace/>
    }

    return <>{children}</>;

}

export default ProtectedRoute;