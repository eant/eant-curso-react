/*****************************/
/* Curso de React - Clase #2 */
/*****************************/

/********** ▼ Referencias a Objetos ▼ **********
let x = 1;
let y = "";
//console.log( x == y ); // false <-- Comparacion liteal

let usuario1 = {
	nombre : "Jose",
	apellido : "Perez"
}

let usuario2 = {
	nombre : "Romina",
	apellido : "Juarez"
}
//console.log( usuario1 == usuario2 ); // false <-- No son iguales

let usuario3 = usuario1;
//console.log( usuario1 == usuario3 ); // true <-- Son iguales porque se "asigna" por referencia

usuario3.nombre = "Pepe";
//console.log( usuario1 == usuario3 ); // true <-- usuario1 tambien fue modificado porque es el referenciado

/********** ▼ Iteracion de Objetos ▼ **********

let personas = [usuario1, usuario2];
//Iteracion clasica
for(var i = 0; i < personas.length; i++){
	console.log(`Me llamo ${personas[i].nombre}`);
}

personas.forEach( persona => console.log(`Me llamo ${persona.nombre}`) );

/********** ▼ Filtrado de Objetos ▼ **********
let usuario1 = {
	nombre : "Jose",
	apellido : "Perez",
	altura : 1.80
}

let usuario2 = {
	nombre : "Romina",
	apellido : "Juarez",
	altura: 1.69
}

let personas = [usuario1, usuario2];

//const esAlta = function(persona){
//	return persona.altura > 1.7
//}

//const esAlta = persona => persona.altura > 1.7
const esAlta = ({altura}) => altura > 1.7 //<-- version refactorizada
const esBaja = ({altura}) => altura < 1.7 //<-- version refactorizada

let personasAltas = personas.filter( esAlta );
let personasBajas = personas.filter( esBaja );

console.log( personasAltas );
console.log( personasBajas );
/********** ▼ Reduce con Objetos ▼ **********
let usuario1 = {
	nombre : "Jose",
	apellido : "Perez",
	altura : 1.80,
	cursosTomados : 10
}

let usuario2 = {
	nombre : "Romina",
	apellido : "Juarez",
	altura: 1.69,
	cursosTomados : 16
}

let personas = [usuario1, usuario2];

const totalCursosTomadosFunction = ( acumulado, persona ) => {
	return acumulado + persona.cursosTomados
}

let totalCursosTomados = personas.reduce( totalCursosTomadosFunction, 0 )
/********** ▼ Array Map ▼ **********
let usuario1 = {
	nombre : "Jose",
	apellido : "Perez",
	altura : 1.80,
	cursosTomados : 10
}

let usuario2 = {
	nombre : "Romina",
	apellido : "Juarez",
	altura: 1.69,
	cursosTomados : 16
}

let personas = [usuario1, usuario2];

//(*) El return provoca un cambio en el objeto original por ser pasado por referencia
//const pasarAlturasCms = persona => {
//	persona.altura *= 100
//	return persona
//}

const pasarAlturasCms = persona => {
	return {
		...persona, //<-- 'Desarma al objeto y convierte a sus propiedad en parametros sueltos (no hara falta hacer persona.nombre)'
		altura : persona.altura * 100
	}
}

let personasConAlturaEnCms = personas.map( pasarAlturasCms ) //(*)

///// OTRO EJEMPLO /////
let sumar = (a,b) => a + b
let data = [12,19]
let resultA = sumar(data[0], data[1]) //<-- ES3
let resultB = sumar.apply(null,data)//<-- ES5
let resultC = sumar(...data) //<-- ES6
////////////////////////
/********** ▼ Clases ▼ **********/

//***** En ES5 *****//
//function Persona(nombre, apellido, altura, cursosTomados){
//	this.nombre = nombre;
//	this.apellido = apellido;
//	this.altura = altura;
//	this.cursosTomados = cursosTomados;
//}
//Persona.prototype.Saludar = function(){
//	console.log(`Hola, mi nombre es ${this.nombre}`);
//}

//let usuario1 = new Persona("Jose", "Perez", 1.80, 10);
//let usuario2 = new Persona("Romina", "Juarez", 1.80, 10);

//usuario1.Saludar();

//***** En ES6 *****//

//class Persona {
//	constructor(nombre, apellido, altura, cursosTomados){
//		this.nombre = nombre;
//		this.apellido = apellido;
//		this.altura = altura;
//		this.cursosTomados = cursosTomados;		
//	}

//	Saludar(){
//		console.log(`Hola, mi nombre es ${this.nombre}`);
//	}
//}

//let usuario1 = new Persona("Jose", "Perez", 1.80, 8);
//let usuario2 = new Persona("Romina", "Juarez", 1.80, 10);

//usuario1.Saludar();

/********** ▼ Herencia ▼ **********/

class Persona {
	constructor(nombre, apellido, altura, cursosTomados){
		this.nombre = nombre;
		this.apellido = apellido;
		this.altura = altura;
		this.cursosTomados = cursosTomados;		
	}

	Saludar(){
		console.log(`Hola, mi nombre es ${this.nombre}`);
	}
}

class Alumno extends Persona {
	constructor(nombre, apellido, altura, cursosTomados){
		super(nombre, apellido, altura, cursosTomados)
	}

	mostrarCursosTomados(){
		console.log(`Yo ${this.nombre} he cursado ${this.cursosTomados} cursos`);
	}
}
let alumno1 = new Alumno("Jose", "Perez", 1.80, 8);
