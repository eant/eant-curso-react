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
}
export default Api