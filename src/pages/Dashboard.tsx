import { useAuth } from "@/features/auth/useAuth";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <div>
            <h1>Panel de control</h1>
            {user && (
                <div>
                    <button onClick={handleLogout}>Cerrar sesión</button>
                </div>
            )}
        </div>
    )
}

export default Dashboard;