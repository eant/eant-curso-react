/***************************************/
/* Curso de React - Clase #3 (Otras innovaciones ES6) */
/***************************************/

/********* ▼ Parametros por Default ▼ *********

//Antes:
//function mostrarInfo(nombre, edad){
//	nombre = nombre || 'usuario'
//	edad = edad || 18
//	console.log(nombre, edad)
//}

//Despues:
function mostrarInfo(nombre = "usuario", edad = 18){
	console.log(nombre, edad)
}

/********* ▼ Iterador/Iterables ▼ *********
//Objetivo: poder iterar "manualmente" los elemento de un Array
let colores = ["ROJO", "AZUL", "VERDE"];

function iterador(coleccion){
	let count = 0;

	return {
		next : function(parametros){
			if( count < coleccion.length ){
				return {
					value : coleccion[count++],
					done : false
				}
			} else {
				return {
					value : undefined,
					done : true
				}
			}
		}
	}
}

let iteradorColores = iterador(colores);

console.log( iteradorColores.next() ) //Object { value: "ROJO", done: false }
console.log( iteradorColores.next() ) //Object { value: "AZUL", done: false }
console.log( iteradorColores.next() ) //Object { value: "VERDE", done: false }
console.log( iteradorColores.next() ) //Object { value: undefined, done: true }

/********* ▼ Generadores ▼ *********
//Funciones que ya tienen el iterador de forma implicita

function* serie(){ //<-- Lleva el * para que lo interprete como "Generador"
	yield 1; //<-- es un 'return' Manual, o bien varios return individuales
	yield 10;
	yield 100;
	yield 1000;
	yield 10000;
	yield 100000;
}

const numerosSeries = serie();

console.log( numerosSeries.next() ) //Object { value: 1, done: false }
console.log( numerosSeries.next() ) //Object { value: 10, done: false }
console.log( numerosSeries.next() ) //Object { value: 100, done: false }
console.log( numerosSeries.next() ) //Object { value: 1000, done: false }
console.log( numerosSeries.next() ) //Object { value: 10000, done: false }
console.log( numerosSeries.next() ) //Object { value: 100000, done: false }
console.log( numerosSeries.next() ) //Object { value: undefined, done: true }

/********* ▼ Generadores (otro ejemplo) ▼ *********
function* serie(i){
	yield i;
	yield i + 5;
	yield i - 5
	yield i / 5
	yield i * 5
}

const numerosSeries = serie(50);

console.log( numerosSeries.next() ) //Object { value: 50, done: false }
console.log( numerosSeries.next() ) //Object { value: 55, done: false }
console.log( numerosSeries.next() ) //Object { value: 45, done: false }
console.log( numerosSeries.next() ) //Object { value: 10, done: false }
console.log( numerosSeries.next() ) //Object { value: 250, done: false }
console.log( numerosSeries.next() ) //Object { value: undefined, done: true }

/********* ▼ Generadores (otro ejemplo) ▼ *********/
//Docs: https://code.tutsplus.com/es/tutorials/using-iterators-and-generators-in-javascript-to-optimize-code--cms-30395
function* subSerie(){
	yield 'Hola';
	yield 'Ejemplo de otro Generador';

}

function* serie(i){
	yield i;
	yield i + 5
	yield i - 5
	yield* subSerie()
	yield i / 5
	yield i * 5
}

const numerosSeries = serie(50);

console.log( numerosSeries.next() ) //Object { value: 50, done: false }
console.log( numerosSeries.next() ) //Object { value: 55, done: false }
console.log( numerosSeries.next() ) //Object { value: 45, done: false }
console.log( numerosSeries.next() ) //Object { value: "Hola", done: false }
console.log( numerosSeries.next() ) //Object { value: "Ejemplo de otro Generador", done: false }
console.log( numerosSeries.next() ) //Object { value: 10, done: false }






