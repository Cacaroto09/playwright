const persona = new Persona("tete",52);
persona.mostrarDetalles();
// Una simple funcion
function sumar (a: number, b: number): number
{
  return a + b ;
}

const resultadoSuma = sumar(5,3);
console.log("Resultado de la suma " , resultadoSuma );

// Funcion Flecha Basica
const suma = (a: number, b: number) : number =>
{
  return a + b
};

const resultadoSumaFlecha = suma(5,3);
console.log("Resultado de la suma",resultadoSuma);

//Funcion Flecha sin paraentisis alrededor de un solo parametro
const esPar = num => num % 2 === 0;
console.log("¿El numero 6 es par?" , esPar(6));

//Funcion flecha con cuerpo Implicito
const saludar = nombre => "Hola" + nombre;
console.log(saludar("Alice"));

//funcion flecha en Mapeo de Arreglo
const numeros = [1,2,3,4,5];
const alcuadrado = numeros.map(num => num * num);

console.log("Arreglo original:" , numeros);
console.log("Arreglo al cuadrado", alcuadrado);