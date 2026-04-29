import axios from "axios";
import { useEffect, useState } from "react";

interface MallInfo {
    nombreCentro: string;
    ciudad: string;
    direccion: string;
    telefono: string;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export const DashboardAdmin = () => {
    const [mallInfo, setMallInfo] = useState<MallInfo | null>(null);
    const [reservasPorDia, setReservasPorDia] = useState<any[]>([]);
    const [ocupacionGlobal, setOcupacionGlobal] = useState<any[]>([]);
    const [rendimientoCanchas, setRendimientoCanchas] = useState<any[]>([]);
    const [canchasActivas, setCanchasActivas] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const storedUser = sessionStorage.getItem("user");
                const token = sessionStorage.getItem("token");

                let mallId: number | null = null;
                if (storedUser) {
                    const user = JSON.parse(storedUser);
                    mallId = user.mallId;
                }

                if (!token || !mallId) {
                    console.warn("⚠️ No se encontró token o mallId en sessionStorage");
                    setLoading(false);
                    return;
                }
                const mallResponse = await axios.get(
                    `${API_URL}/malls/${mallId}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setMallInfo(mallResponse.data);

                const courtsResponse = await axios.get(
                    `${API_URL}/courts/mall/${mallId}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                const courts = courtsResponse.data;
                const actives = courts.length;

                setCanchasActivas(actives);

                const reservasResponse = await axios.get(
                    `${API_URL}/reservations/mall/${mallId}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                const reservas = reservasResponse.data;

                const diasSemana = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
                const reservasPorDiaTemp = diasSemana.map((dia, i) => ({
                    name: dia,
                    reservas: reservas.filter(
                        (r: any) => new Date(r.fechaReserva).getDay() === i
                    ).length,
                }));
                setReservasPorDia(reservasPorDiaTemp);

                const total = reservas.length;
                const activas = reservas.filter((r: any) => r.estado === "Activa").length;
                const inactivas = total - activas;

                setOcupacionGlobal([
                    { name: "Activas", value: activas },
                    { name: "Inactivas", value: inactivas },
                ]);

                const rendimientoTemp = courts.map((cancha: any) => {
                    const reservasCancha = reservas.filter(
                        (r: any) => r.courtId === cancha.id
                    ).length;
                    return {
                        cancha: cancha.nombreCancha,
                        ocupacion: reservasCancha,
                    };
                });
                setRendimientoCanchas(rendimientoTemp);

                setLoading(false);
            } catch (error) {
                console.error("❌ Error cargando el dashboard:", error);
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    return {
        mallInfo,
        reservasPorDia,
        ocupacionGlobal,
        rendimientoCanchas,
        canchasActivas,
        loading
    }
}