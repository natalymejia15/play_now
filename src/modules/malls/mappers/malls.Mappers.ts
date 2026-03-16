
import type { AdminData, IMall, MallData } from "../interfaces";

export const mapMallResponseToMallData = (data: IMall): MallData => ({
  id: data.id,
  nombre_centro: data.nombreCentro,
  direccion: data.direccion,
  telefono: data.telefono,
  ciudad: data.ciudad,
  created_at: data.created_at,
});

export const mapMallResponseToAdminData = (data: IMall): AdminData | null => {
  if (!data.administrador) return null;

  return {
    id: data.administrador.id,
    first_name: data.administrador.primerNombre,
    segundo_nombre: data.administrador.segundoNombre,
    last_name: data.administrador.primerApellido,
    segundo_apellido: data.administrador.segundoApellido,
    email: data.administrador.correo,
    phone_number: data.administrador.celular,
    document_type: data.administrador.tipoDocumento,
    document_number: data.administrador.numeroDocumento,
    address: data.administrador.direccion,
  };
};