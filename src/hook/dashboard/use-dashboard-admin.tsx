import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

interface DashboardStats {
  totalMalls: number;
  totalCourts: number;
  totalUsers: number;
  totalAdmins: number;
  totalClients: number;
  mallsByCity: { ciudad: string; count: number }[];
  newUsersByMonth: { mes: string; count: number }[];
}

export const useDashboardStats = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const [mallsRes, courtsRes, usersRes] = await Promise.all([
          axios.get(`${API_URL}/malls`, { headers }),
          axios.get(`${API_URL}/courts`, { headers }),
          axios.get(`${API_URL}/users`, { headers }),
        ]);

        const malls = mallsRes.data;
        const courts = courtsRes.data;
        const users = usersRes.data;

        const totalMalls = malls.length;
        const totalCourts = courts.length;
        const totalUsers = users.length;

        // Roles
        const totalAdmins = users.filter((u: any) => u.idRol === 2).length;
        const totalClients = users.filter((u: any) => u.idRol === 3).length;

        // Agrupar malls por ciudad
        const mallsByCityMap: Record<string, number> = {};
        malls.forEach((mall: any) => {
          if (!mall.ciudad) return;
          mallsByCityMap[mall.ciudad] = (mallsByCityMap[mall.ciudad] || 0) + 1;
        });

        const mallsByCity = Object.entries(mallsByCityMap).map(([ciudad, count]) => ({
          ciudad,
          count,
        }));

        // === NUEVOS USUARIOS POR MES ===
        const meses = [
          "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
          "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
        ];

        const usuariosPorMes: Record<string, number> = {};
        users.forEach((u: any) => {
          if (!u.createdAt) return;
          const fecha = new Date(u.createdAt);
          const mes = meses[fecha.getMonth()];
          usuariosPorMes[mes] = (usuariosPorMes[mes] || 0) + 1;
        });

        const newUsersByMonth = meses.map((mes) => ({
          mes,
          count: usuariosPorMes[mes] || 0,
        }));

        setStats({
          totalMalls,
          totalCourts,
          totalUsers,
          totalAdmins,
          totalClients,
          mallsByCity,
          newUsersByMonth,
        });
      } catch (error) {
        console.error("Error al cargar estadísticas:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, isLoading };
};
