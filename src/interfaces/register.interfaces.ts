export interface RegisterFormData {
  tipoDocumento: "CC" | "NIT";       
  numeroDocumento: string;           
  primerNombre?: string;           
  segundoNombre?: string;         
  primerApellido?: string;          
  segundoApellido?: string;         
  razonSocial?: string;              
  correo: string;                    
  celular: string;                   
  direccion: string;               
  password: string;                 
  idRol: number;                     
}
