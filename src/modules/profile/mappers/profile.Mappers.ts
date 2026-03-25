import type { ApiProfile, IProfile, ProfileFormData } from "../interfaces";

export const mapProfileToFormData = (profile: IProfile): ProfileFormData => ({
    id: profile.id ?? 0,
    tipoDocumento: profile.document_type ?? "",
    numeroDocumento: profile.document_number ?? "",
    primerNombre: profile.first_name ?? "",
    segundoNombre: profile.segundo_nombre ?? "",
    primerApellido: profile.last_name ?? "",
    segundoApellido: profile.segundo_apellido ?? "",
    correo: profile.email ?? "",
    celular: profile.phone_number ?? "",
    direccion: profile.address ?? "",
    nombreNegocio: profile.business_name ?? "",
    fechaNacimiento: profile.birth_date ? new Date(profile.birth_date).toISOString().split("T")[0] : ""
});

export const mapFormToPayload = (p: IProfile): Partial<IProfile> => ({
    email: p.email,
    first_name: p.first_name,
    segundo_nombre: p.segundo_nombre,
    last_name: p.last_name,
    segundo_apellido: p.segundo_apellido,
    document_type: p.document_type,
    document_number: p.document_number,
    birth_date: p.birth_date,
    phone_number: p.phone_number,
    address: p.address,
    business_name: p.business_name,
});
export const apiToIProfile = (d: ApiProfile): IProfile => ({
    id: d.id ?? 0,
    email: d.correo ?? d.email ?? "",
    first_name: d.primerNombre ?? d.first_name ?? "",
    segundo_nombre: d.segundoNombre ?? d.segundo_nombre ?? "",
    last_name: d.primerApellido ?? d.last_name ?? "",
    segundo_apellido: d.segundoApellido ?? d.segundo_apellido ?? "",
    document_type: d.tipoDocumento ?? d.document_type ?? "",
    document_number: d.numeroDocumento ?? d.document_number ?? "",
    birth_date: d.fechaNacimiento ?? d.birth_date ?? d.createdAt ?? "",
    phone_number: d.celular ?? d.phone_number ?? "",
    address: d.direccion ?? d.address ?? "",
    business_name:
        d.razonSocial ?? d.nombreNegocio ?? d.business_name ?? "",
});