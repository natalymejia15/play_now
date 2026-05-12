export interface IContact {
    nombre: string;
    email: string;
    mensaje: string;
    tipo: string;
}

export interface ICreateContactRequest {
    nombre: string;
    email: string;
    mensaje: string;
    tipo: string;
}