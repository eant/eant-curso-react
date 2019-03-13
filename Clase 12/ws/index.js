import express from 'express'
import loki from 'lokijs'
import * as http from 'http'
import socketio from 'socket.io'
import * as path from 'path'

let taskCollection;

const db = new loki('task.json', {
    autoload : true,
    autosave : true,
    autosaveInterval : 4000,
    //autoloadCallback : databaseInitialize,
    autoloadCallback : function(){
      taskCollection = db.getCollection("task");
      if (taskCollection === null) {
        taskCollection = db.addCollection("task");
      }
    }
});
/*
function databaseInitialize() {
  taskCollection = db.getCollection("task");
  if (taskCollection === null) {
    taskCollection = db.addCollection("task");
  }
}
*/

const port = process.env.PORT || 9000
const app = express()

app.use( express.static('public') ) //<- hacer que en /public corra como Web Server

app.get("/", (req, res) => {
  res.sendFile( path.join(__dirname + '/public/index.html') )
})

let server = http.createServer( app )
let io = socketio( server )

server.listen( port, () => {
    console.log(`(info) Server corriendo en el puerto: ${port}`)
})



io.on('connection', (socket) => {
  console.log(`Usuario conectado`)

  let tasks = taskCollection.chain().simplesort("$loki",true).data()

  socket.emit(`tasks_emit`, tasks)

  socket.on('task_create', (task) => {
    let newTask = {
        title: task.title || '',
        responsible: task.responsible || '',
        description: task.description || '',
        priority: task.priority || ''
    }
    let element = taskCollection.insert(newTask)

    //Fuerzo a que todos los clientes detecten el nuevo elemento
    let tasks = taskCollection.chain().simplesort("$loki",true).data()

    io.sockets.emit(`tasks_emit`, tasks)
  })

  socket.on('task_delete', (id) => {

    let task = taskCollection.get(id)
    task && taskCollection.remove(task)

    //Fuerzo a que todos los clientes detecten el nuevo elemento
    let tasks = taskCollection.chain().simplesort("$loki",true).data()
    io.sockets.emit(`tasks_emit`, tasks)

  })
})



/*
app.post('/tasks', (req, res) => {
    let request = req.body

    console.log(request)

    let task = {
        title: request.title || '',
        responsible: request.responsible || '',
        description: request.description || '',
        priority: request.priority || ''
    }

    let element = taskCollection.insert(task)

    res.status(200).send({response: element});
});
app.get('/tasks', (req, res) => {
    let tasks = taskCollection.chain().simplesort("$loki",true).data()
    res.status(200).send({response: tasks})
});
// 2 Borrar elemento
app.delete('/tasks/:id', (req, res) => {
    let id = req.params.id
    let task = taskCollection.get(id)
    task && taskCollection.remove(task)
    res.status(200).send({response: task})
});
*/
