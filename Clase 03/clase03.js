/***************************************/
/* Curso de React - Clase #3 */
/***************************************/

/********* ▼ Datos AJAX ▼ *********/
const API_URL = "https://pokeapi.co/api/v2/";
const POKEMON_BY_ID = 'pokemon/:id';

/********* ▼ SINCRONICO (avanzado) CON FETCH ▼ *********
const fetchPokemon = (id) => {

const url = `${API_URL}${POKEMON_BY_ID.replace(':id', id)}`;
return fetch(url)
		.then( data => data.json() )
		.catch( id => { console.log(`Fallo el Pokemon #${id}`) } )

}

//Obtener varios Pokemons segun ID
let ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let promesas = ids.map( id => fetchPokemon(id) ); //<-- Podria haberlo hecho con for/foreach... pero con .map() simplifica


Promise.all( promesas ).then((pokemons)=>{
	console.log(pokemons)
	pokemons.forEach( pokemon => {
		console.log(`${pokemon.name}`)
	})
})

/********* ▼ ASYNC / AWAIT ▼ *********/

const getPokemon = (id) => {
	const url = `${API_URL}${POKEMON_BY_ID.replace(':id', id)}`;
	return fetch(url)
		.then( data => data.json() )
		.catch( id => { console.log(`Fallo el Pokemon #${id}`) } )
}

async function getAllPokemon(){ //<-- Requisito: manejar los error con try/catch
	let ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	let promesas = ids.map( id => getPokemon(id) );

	try { //<-- "intentar" hacer algo...

		let pokemons = await Promise.all( promesas ); //<--- 'await' indica que debe esperar a que se resuelva la operacion asincronica
		let pikachu = await getPokemon(25).then( pokemon => { console.log(pokemon) }); //<--- cada operacion con 'await' espera a que termine la anterior para avanzar...
		console.log( pokemons );

	} catch(e){ //<-- ...captura el error en caso que el intento falle.

	}

}