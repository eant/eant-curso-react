/*
const API_URL = "http://localhost:8080"
const HEADERS = new Headers({ "Access-Control-Allow-Origin" : "*" })

export async function getAll(){

	//return await fetch(`${API_URL}/tasks`).then( data => data.json() )
	return await fetch(`${API_URL}/tasks`,{
		method : "GET",
		headers : HEADERS,
	}).then( data => data.json() )

}
*/
class Api {
	static get API_URL(){
		return "http://localhost:8080"
	}
	async getAll(){
		return await fetch(`${Api.API_URL}/tasks`)
		.then( data => data.json() )
		.then( data => data.response.map( element => {
				return {
					id : element.$loki,
					created : element.meta.created,
					title : element.title,
					responsible : element.responsible,
					description : element.description,
					priority : element.priority
				}
			})
		)
	}
	async delete(id){
		return await fetch(`${Api.API_URL}/tasks/${id}`, { method : "DELETE" })
		//.then( data => data.json() )

		/*
		.then( data => data.response.map( element => {
				return {
					id : element.$loki,
					created : element.meta.created,
					title : element.title,
					responsible : element.responsible,
					priority : element.priority
				}
			})
		)
		*/
	}
	async create(task, callback){ //<-- el callback es una 'burbuja' pendiente que se ejecutara en el momento que se indique
		console.log(task)
		await fetch(`${Api.API_URL}/tasks/`, {
			method : "POST",
			body : JSON.stringify(task),
			headers : { 'Content-Type' : 'application/json' }
		})
		.then( response => response.json() )
		//.then( response => console.log(response) )
		.then( data => {
				
				let element = data.response;

				return {
					id : element.$loki,
					created : element.meta.created,
					title : element.title,
					responsible : element.responsible,
					description : element.description,
					priority : element.priority
				}
		})
		.then( response => {
			callback && callback(response) //<-- Si existe, que lo ejecute
		})
		
	}
}
export default Api