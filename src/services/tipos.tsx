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
    escuelas:Escuela [],
    legajo: Number,
    nombre: String
}
export interface Escuela{
  idEscuela: Number, 
  nombre: String
}