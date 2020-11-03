export interface Profesores {
    list: Profesor[],
    message: String,
    success: String
  }

export interface Profesor{

    apellido: String,
    especialidad: String,
    fechaIngreso: String,
    fecha_nacimiento: String,
    id: Number,
    idEscuela:Escuela,
    legajo: Number,
    nombre: String
}
export interface Escuela{
  dEscuela: Number, 
  nombre: String
}