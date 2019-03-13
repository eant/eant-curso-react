/***************************************/
/* Curso de React - Clase #2 (eventos) */
/***************************************/
//NOTA: JS solo puede ejecutar 1 cosa a la vez

/********* ▼ Ejemplo de callstack sicronico ▼ *********
console.log(1)
console.log(2)

window.setTimeout(() => { console.log(4) }, 0)

for (var i = 0; i < 1000; i++) {
	console.log(i)
}

console.log(3)
/********* ▼ Ejemplo AJAX ▼ *********/
const API_URL = "https://pokeapi.co/api/v2/";
const POKEMON_BY_ID = 'pokemon/:id';

// const getPokemonByID = (id, callback) => {

// 	const xhr = new XMLHttpRequest();
// 	xhr.open("GET", `${API_URL}${POKEMON_BY_ID.replace(':id', id)}`);
// 	xhr.onload = () => {
// 		if( xhr.status == 200 ){
// 			// version desglosada ▼
// 			//if(typeof callback != undefined) {
// 			//	callback( JSON.parse(xhr.response) )	
// 			//}
// 			callback && callback( JSON.parse(xhr.response) );
// 			//console.log( JSON.parse(xhr.response) )
// 		} else {
// 			console.log(xhr.status)
// 		}
// 	}
// 	xhr.send();
// }


// getPokemonByID(12);
// getPokemonByID(24);
// getPokemonByID(48);

/********* ▼ ASINCRONICO ▼ *********
getPokemonByID(12, data => {
	console.log(data)
});
getPokemonByID(24, data => {
	console.log(data)
});
getPokemonByID(48, data => {
	console.log(data)
});

/********* ▼ SINCRONICO (MAL!) ▼ *********
getPokemonByID(12, data => {
	console.log(data)

	getPokemonByID(24, data => {
		console.log(data)

		getPokemonByID(12, data => {
			console.log(data)
		});
	});
});
*/

/********* ▼ SINCRONICO CON PROMESAS ▼ *********/
const getPokemonByID = (id, succes, error) => {

	const xhr = new XMLHttpRequest();
	xhr.open("GET", `${API_URL}${POKEMON_BY_ID.replace(':id', id)}`);
	xhr.onload = () => {
		if( xhr.status == 200 ){

			succes && succes( JSON.parse(xhr.response) );
			
		} else {
			console.log(xhr.status)
		}
	}
	xhr.send();
}

const getPokemon = id => {

	return new Promise((resolve, reject) => {

		getPokemonByID(id, data => resolve(data), id => reject(id) );

	});

}

//getPokemon(17)
//.then(pokemon => {
//	console.log(pokemon)
//	return getPokemon(56)
//})
//.then(pokemon => {
//	console.log(pokemon)
//	return getPokemon(47)
//})
//.then(pokemon => {
//	console.log(pokemon)
//})

/********* ▼ SINCRONICO CON PROMESAS (TODAS COMO UN ARRAY) ▼ *********/
Promise.all( [getPokemon(82), getPokemon(30), getPokemon(98)] ).then((pokemons)=>{
	console.log(pokemons)
	pokemons.forEach( pokemon => {
		console.log(`${pokemon.name}`)
	})
})

/********* ▼ SINCRONICO CON FETCH ▼ *********/
const fetchPokemon = (id) => {

	const url = `${API_URL}${POKEMON_BY_ID.replace(':id', id)}`;
	return fetch(url)
			.then( data => data.json() )
			.catch( id => { console.log(`Fallo el Pokemon #${id}`) } )

}

fetchPokemon(45).then(pokemon => {
	console.log(pokemon)
})

Promise.all( [fetchPokemon(1), fetchPokemon(2), fetchPokemon(3)] ).then((pokemons)=>{
	console.log(pokemons)
	pokemons.forEach( pokemon => {
		console.log(`${pokemon.name}`)
	})
})