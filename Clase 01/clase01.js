/*****************************/
/* Curso de React - Clase #1 */
/*****************************/


//ES6 - Template String
var nombre = "Silvio"; //String
var edad = 31; //Number
var apellido = "Messina"; //String

console.log(`Mi nombre es ${nombre} y mi edad es ${edad}`); //<-- Mi nombre es Silvio y mi edad es 31
console.log(`Mi apellido es ${apellido.substr(0,5)}`); //<-- Mi apellido es Messi


//ES6 - Variables y Ambitos
//Nota: Toda variable creada con 'var' se crea si o si en memoria (llege o no a asignarsele un valor)
if( 1 == 1 ){
	var rta = ":)";
} else {
	var error = ":(";
}
console.log(rta); //<-- :)
console.log(error); //<-- undefined (la variable existe pero co valor 'undefined')
//Variables con 'let' son creadas solamente en el ambito en que es creada

//Variables y Funciones
let name = "Pedro";
let age = 32;

function imprimirMayusculas(){
	name = name.toUpperCase()
	console.log(name)
}

function imprimirEdad(n,a){
	console.log(`La edad de ${n} es ${a}`)
}

//Objetos en vez de variables
let pedro = {
	nombre : "Pedro",
	apellido : "Lopez",
	edad : 24
}

let maria = {
	nombre : "Maria",
	apellido : "Sanchez",
	edad : 22
}

function printAge(usuario){
	console.log(`La edad de ${usuario.nombre} es ${usuario.edad}`);
}
printAge(pedro);
printAge(maria);
printAge({ nombre : "Lucia", edad : 19 });

//ES6 - Variables y Constantes como funciones
const imprimirAge = function(usuario){
	console.log(`La edad de ${usuario.nombre} es ${usuario.edad}`);
}

let printUppercase = function(usuario){
	usuario.nombre = usuario.nombre.toUpperCase()
	console.log(usuario.nombre)
}

//ES6 - Arrow Functions
const printEdad = ({ nombre, edad }) => { //<-- Un argumento ({xxx, xxx}) "desestructura" un objeto, quedandose solo con las propiedades alli indicadas
	console.log(`La edad de ${nombre} es ${edad}`);
}

const printName = (n) => { //<-- Version minimalista: const printName = n => `El nombre es ${n}`;
	return `El nombre es ${n}`;
};

const esMayor = edad => edad >= 18

const permitirAcceso = ({edad}) => { //<-- Version minimalista: const permitirAcceso = ({edad}) => !esMayor(edad) ? console.log("NO es adulto") : console.log("Es adulto")
	!esMayor ? console.log("NO es adulto") : console.log("Es adulto");
}
permitirAcceso(pedro)