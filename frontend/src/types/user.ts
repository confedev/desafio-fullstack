export interface User {
  id: number;
  nombres: string;
  apellidos: string;
  rut: number;
  dv: string;
  fechaNacimiento: string;
  correoElectronico: string;
  contrasena: string;
}

export interface UserRequest {
  nombres: string;
  apellidos: string;
  rut: number | '';
  dv: string;
  fechaNacimiento: string;
  correoElectronico: string;
  contrasena: string;
}
