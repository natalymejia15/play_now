import { useState } from "react";
import { toast } from "../use-toast";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";
export const useDeports = () => {
    const token = localStorage.getItem("token");
    const [fetching, setFetching] = useState(false);
    const [deports, setDeports] = useState<any[]>([]);

    const fetchDeports = async () => {
        if (!token) {
            toast({
                title: "Error",
                description: "No se encontró token de autenticación",
                variant: "destructive",
            });
            return;
        }

        setFetching(true);
        try {
            const { data } = await axios.get(`${API_URL}/sports`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setDeports(data || []);
        } catch (error: any) {
            console.error("Error fetching sports:", error);
            toast({
                title: "Error",
                description: error?.response?.data?.message || "No se pudieron cargar los centros comerciales",
                variant: "destructive",
            });
        } finally {
            setFetching(false);
        }
    }

    return { deports, fetchDeports, fetching };
}