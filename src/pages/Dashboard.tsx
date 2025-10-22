import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const userCtx = useContext(UserContext);
    const navigate = useNavigate();

    if (!userCtx) {
        throw new Error("Dashboard debe estar dentro de UserProvider");
    }

    const { user, logout } = userCtx;

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