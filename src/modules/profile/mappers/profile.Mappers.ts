import type { ApiProfile, IProfile, ProfileFormData } from "../interfaces";

export const mapProfileToFormData = (profile: IProfile): ProfileFormData => ({
    id: profile.id ?? 0,
    tipoDocumento: profile.tipoDocumento ?? "",
    numeroDocumento: profile.numeroDocumento ?? "",
    primerNombre: profile.primerNombre ?? "",
    segundoNombre: profile.segundoNombre ?? "",
    primerApellido: profile.primerApellido ?? "",
    segundoApellido: profile.segundoApellido ?? "",
    correo: profile.correo ?? "",
    celular: profile.celular ?? "",
    direccion: profile.direccion ?? "",
    razonSocial: profile.razonSocial ?? "",
});

export const mapFormToPayload = (p: IProfile): Partial<IProfile> => ({
    correo: p.correo,
    primerNombre: p.primerNombre,
    segundoNombre: p.segundoNombre,
    primerApellido: p.primerApellido,
    segundoApellido: p.segundoApellido,
    tipoDocumento: p.tipoDocumento,
    numeroDocumento: p.numeroDocumento,
    celular: p.celular,
    direccion: p.direccion,
    razonSocial: p.razonSocial,
});
export const apiToIProfile = (d: ApiProfile): IProfile => ({
    id: d.id ?? 0,
    correo: d.correo ?? "",
    primerNombre: d.primerNombre ?? "",
    segundoNombre: d.segundoNombre ?? "",
    primerApellido: d.primerApellido ?? "",
    segundoApellido: d.segundoApellido ?? "",
    tipoDocumento: d.tipoDocumento ?? "",
    numeroDocumento: d.numeroDocumento ?? "",
    celular: d.celular ?? "",
    direccion: d.direccion ?? "",
    razonSocial: d.razonSocial ?? "",
});