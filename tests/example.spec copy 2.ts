class Persona {
nombre: string;
edad: number;

constructor(nombre: string, edad: number)
{
  this.nombre = nombre;
  this.edad = edad;
}
mostrarDetalles(){
 
 console.log("La edad es: " + this.edad + "Nombre es: " + this.nombre); 
}
}

function restar(a: number , b: number) {
  return a-b;

}