import express from 'express'
import bodyParser from 'body-parser'
import loki from 'lokijs' //<-- Almacenamiento de datos en memoria y con persistencia (lokijs.org)

/* console.log("Todo joya!") */
const app = express()
//const db = new loki()
let taskCollection;

const db = new loki("task.json", {
	autoload : true,
	autoloadCallback : databaseInitialize,
	autosave: true,
	autosaveInterval: 4000
})

function databaseInitialize() {
 	taskCollection = db.getCollection("task")
 	
 	if( taskCollection === null ){
 		taskCollection = db.addCollection("task")
 	}
 }

app.use( bodyParser.json() )
app.use( bodyParser.urlencoded({ extended : true }) )

/*
app.get("/", (request, response) => {
	response.send(":)")
})
app.get("/hola", (request, response) => { //<-- soporta /hola?param=value
	response.send(`Hola ${request.query.name}`) //<-- para leer query string via GET
})
app.get("/hola/:name", (request, response) => { //<-- soporta /hola/value
	response.send(`Hola ${request.params.name}`) //<-- para leer query string via GET
})
*/
app.get("/task", (request, response) => {
	let task = taskCollection.chain().data() //<-- Extraer toda la data
	response.send(task)
})
app.post("/task", (request, response) => {
	//response.send(request.body) //<-- RECORDAR: los datos via POST pueden llegar al server vía header/body/cookie/etc
	let data = request.body;

	let task = {
		title : data.title || `none`,
		responsible : data.responsible || `none`,
		description : data.description || `none`,
		priority : data.priority || `low`
	}

	console.log(task)

	let item = taskCollection.insert(task)

	response.send(item)
})

app.delete("/task/:id", (request, response) => {
	let id = request.params.id
	let task = taskCollection.get(id)

	task && taskCollection.remove(task)

	response.send(task)
})

const server = app.listen(8000, () => {
	console.log('Server runing on port 8000')
})