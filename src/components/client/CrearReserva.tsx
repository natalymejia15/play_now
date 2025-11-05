import { useEffect } from "react";

export default function CrearReserva() {
    useEffect(() => {
        document.title = "Reserva- Play now";
    }, []);

    return (
        <div className="text-center py-12">
            <h1 className="text-4xl font-bold mb-4">Bienvenido a las Reservas</h1>
            <p className="text-lg text-muted-foreground">
                Aquí podrás gestionar tus reservas de canchas
            </p>
        </div>
    );
}
