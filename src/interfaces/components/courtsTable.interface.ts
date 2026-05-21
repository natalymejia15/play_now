export interface Court {
    id: number;
    cancha: string;
    deporte: string;
    cantidad: number;
    valorHora: number;
    estado: boolean;
    disponibilidad: string;
}

export interface PropsCourtsTable {
    courts: Court[];
}