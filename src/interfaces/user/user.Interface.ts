export interface User {
  id: number
  correo: string
  numeroDocumento: string
  idRol: number
  mallId: number
}

export interface UserFormData {
  nombreCentro: string,
  direccionMall: string,
  telefono: string,
  ciudad: string,
  tipoDocumento: "CC",
  numeroDocumento: string,
  primerNombre: string,
  segundoNombre: string,
  primerApellido: string,
  segundoApellido: string,
  correo: string,
  celular: string,
  direccionAdmin: string,
  password: string,
}

export const INITIAL_DATA_USER: UserFormData = {
  nombreCentro: "",
  direccionMall: "",
  telefono: "",
  ciudad: "",
  tipoDocumento: "CC",
  numeroDocumento: "",
  primerNombre: "",
  segundoNombre: "",
  primerApellido: "",
  segundoApellido: "",
  correo: "",
  celular: "",
  direccionAdmin: "",
  password: "",
}

export interface UserEditFormData extends UserFormData {
  id: number;
}